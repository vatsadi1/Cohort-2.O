# React Context + Auth Architecture (Q&A Notes)

---

## 1. Explain this AuthContext code

**Answer:**
Creates global auth state using Context API.

- `createContext()` → creates shared container  
- `AuthProvider` → wraps app  
- `useState` → stores `user` and `loading`  
- `Provider value` → exposes state globally  

---

## 2. Mind map for any context file

**Answer:**
Context
│
├── createContext()
├── Provider
│ ├── state
│ ├── actions
│ └── value
└── Consumers (useContext)


Flow:UI → Hook → Context → UI re-render
---


---

## 3. Why custom hooks?

**Answer:**
- Avoid repetition  
- Centralize logic  
- Add safety checks  
- Hide internal implementation  

Example:
```js
const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw Error("Must use inside provider")
  return context
}

---
4. If no custom hooks?

Answer:

Repetition everywhere
Tight coupling
Hard to refactor
No control over state usage

5. Is this architecture correct?

UI → Hooks → State → API

Answer: ❌ Slightly wrong

Correct:

UI → Hook → API → Hook → Context → UI
6. Form calling handleLogin correct?

Answer: ✔ Yes

But fix:

const success = await handleLogin(username, password)
if (success) navigate('/')

---

# React Auth Context – Key Concepts (Q&A)

---

## 7. Is `handleLogin` calling API correct?

**Answer:** ✔ Yes if:
- Uses API layer  
- Waits for response  
- Updates context after success  

---

## 8. Is context only for storing user?

**Answer:** ❌ No  

Also stores:
- `loading`  
- `login/logout` functions  
- auth status  

---

## 9. How data gets into context?

**Answer:**  
Not by wrapping.  

Only via:
```js
setUser(data)

---

10. Is hook responsible for setting context?

Answer: ✔ Yes

UI sends data
Hook processes
Hook updates context
11. Context stores API response or UI input?

Answer:

❌ UI input
✔ API response (validated)
12. Display response: state or context?

Answer:

Local → useState
Global → Context

Rule:

Global → Context  
Local → useState  
13. Show logged-in user after login?

Answer:

Read directly from context:

const { user } = useAuth()

React auto re-renders after:

setUser(data)

---

Final Mental Model
UI → sends input  
Hook → logic + API  
API → backend  
Context → storage  
UI → reads state  

---

Core Rules:
UI never calls API directly
UI never updates context directly
Hook controls everything
Context stores only clean global state
