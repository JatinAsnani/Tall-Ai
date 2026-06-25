from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from deps import get_current_user
from auth import verify_password, get_password_hash, create_access_token
import models
import schemas

router = APIRouter()


@router.post("/register", response_model=schemas.TokenResponse)
def register(data: schemas.UserRegister, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = models.User(
        name=data.name,
        email=data.email,
        password_hash=get_password_hash(data.password),
        business_name=data.business_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer", "user": user}


@router.post("/login", response_model=schemas.TokenResponse)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form.username).first()
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer", "user": user}


@router.post("/login/json", response_model=schemas.TokenResponse)
def login_json(data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer", "user": user}


@router.get("/me", response_model=schemas.UserResponse)
def get_me(user: models.User = Depends(get_current_user)):
    return user


@router.put("/profile", response_model=schemas.UserResponse)
def update_profile(
    data: schemas.UserProfileUpdate,
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
    db.commit()
    db.refresh(user)
    return user
