# 🔐 Bcrypt Flow (Register & Login)

---

## 🔥 🔐 REGISTER FLOW (Password Save)

```
User → password enter karta hai
        ↓
Backend → bcrypt.hash(password, 10)
        ↓
Step 1: salt generate (random)
Step 2: password + salt combine
Step 3: multiple hashing rounds
        ↓
Final hash (salt + hash embedded)
        ↓
DB me save
```

---

### 🧠 Example (real feel)

```
password: 123456

salt: x7aK9

final hash:
$2b$10$x7aK9abc...encrypted
```

👉 DB me ye store hota hai (NOT original password)

---

## 🔥 🔑 LOGIN FLOW (Password Check)

```
User → password enter karta hai
        ↓
Backend → DB se stored hash nikalta hai
        ↓
bcrypt.compare(inputPassword, storedHash)
        ↓
Step 1: stored hash se salt extract
Step 2: input password + same salt
Step 3: same hashing process
        ↓
Compare with stored hash
        ↓
Match? → Login success
```

---

### 🧠 Example

```
User input:
123456

Stored hash:
$2b$10$x7aK9abc...
```

👉 bcrypt:

```
salt = x7aK9 extract karta hai

phir:
hash(123456 + x7aK9)
```

👉 match → ✅ login

---

## ⚡ Key Insight (most important)

* Salt store hota hai hash ke andar
* Isliye compare possible hai

---

## 🎯 One-line

* Register: hash banao + store karo
* Login: same process run karke compare karo

---

## 🔍 Hash Breakdown

```
$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
\__/\/ \____________________/\_____________________________/
Alg Cost      Salt                        Hash
```
