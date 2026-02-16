"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase/FirebaseConfig"
import { useAuth } from "@/context/AuthContext" // your auth context

export default function UserAttendance() {
  const { user } = useAuth()
  const [date, setDate] = useState(new Date())
  const [status, setStatus] = useState(null)

  const formattedDate = date ? format(date, "yyyy-MM-dd") : ""

  useEffect(() => {
    if (!user || !formattedDate) return

    const fetchStatus = async () => {
      const docRef = doc(db, "users", user.uid, "attendance", formattedDate)
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        setStatus(snap.data().status)
      } else {
        setStatus(null)
      }
    }

    fetchStatus()
  }, [date, user])

  const markAttendance = async (value) => {
    if (!user || !formattedDate) return

    await setDoc(doc(db, "users", user.uid, "attendance", formattedDate), {
      status: value,
      date: formattedDate,
      timestamp: serverTimestamp(),
    })

    setStatus(value)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Selected Date: {formattedDate}
        </h2>

        <div className="flex gap-4">
          <Button
            onClick={() => markAttendance("present")}
            className="bg-green-600 hover:bg-green-700"
          >
            Mark Present
          </Button>

          <Button
            onClick={() => markAttendance("absent")}
            variant="destructive"
          >
            Mark Absent
          </Button>
        </div>

        {status && (
          <p className="text-lg">
            Status:{" "}
            <span
              className={
                status === "present"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {status.toUpperCase()}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
