from fastapi import FastAPI
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# 1. Setup Database SQLite
DATABASE_URL = "sqlite:///./presence.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. Model Tabel Absensi
class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String)
    nim = Column(String)
    waktu_hadir = Column(DateTime, default=datetime.now)

# Buat tabel secara otomatis (Ini perbaikannya, pakai Base.metadata)
Base.metadata.create_all(bind=engine)

# 3. Inisialisasi FastAPI
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Izinkan semua alamat akses
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tambahkan route buat ambil semua data absen
@app.get("/attendance-list")
def get_attendance():
    db = SessionLocal()
    data = db.query(Attendance).all()
    db.close()
    return data

@app.get("/")
def home():
    return {"message": "Backend Presence QR System Ready! 🚀"}

@app.post("/attend")
def post_attendance(nama: str, nim: str):
    db = SessionLocal()
    try:
        new_data = Attendance(nama=nama, nim=nim)
        db.add(new_data)
        db.commit()
        db.refresh(new_data)
        return {"status": "Berhasil Absen!", "data": new_data}
    finally:
        db.close()