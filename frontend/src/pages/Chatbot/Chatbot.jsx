"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "../../components/ui/button"
import Header from "../../components/ui/header"
import PageHeader from "../../components/ui/PageHeader"
import HeaderButton from "../../components/ui/HeaderButton"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Send, MessageCircle, Loader2, Info } from "lucide-react"
import BackButton from "../../components/ui/BackButton";
import { fetchChatHistory, sendChatMessage, clearChatHistory } from "../../api/chatAPI"

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    inputRef.current?.focus()
  }, [messages])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await fetchChatHistory()
        const formatted = data.messages.map((m) => ({
          sender: m.sender,
          text: m.text,
        }))
        setMessages(formatted)
      } catch (err) {
        console.error("Failed to load history", err)
      }
    }

    fetchHistory()
  }, [])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = { sender: "user", text: inputMessage }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setLoading(true)
    setError(null)

    try {
      const data = await sendChatMessage(inputMessage)
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }])
    } catch (err) {
      const fallback = {
        sender: "ai",
        text: err.error || "Sorry, I couldn't get a response. Please try again.",
      }
      setError(err.error || "Failed to get AI response.")
      setMessages((prev) => [...prev, fallback])
    } finally {
      setLoading(false)
    }
  }

  const handleClearChat = async () => {
    try {
      await clearChatHistory()
      setMessages([])
    } catch (err) {
      console.error("Failed to clear chat", err)
      alert("Something went wrong while clearing chat.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-4 flex-1 flex flex-col max-w-3xl overflow-hidden">
        <div className="flex items-center gap-4 mb-4">
  <BackButton />
  <PageHeader
    icon={MessageCircle}
    title="AI Fitness Chatbot"
    subtitle="Ask me anything about fitness, nutrition, or your workouts!"
    className="mb-0"
  />
</div>
        <div className="flex justify-end mb-2">
          <Button
            onClick={handleClearChat}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            variant="outline"
          >
            Clear Chat
          </Button>
        </div>

        <Card className="flex-1 flex flex-col border-0 bg-white/70 backdrop-blur-sm shadow-xl overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl text-gray-800">Conversation</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                <p>Start a conversation by typing a message below.</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-100 text-gray-800 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Typing...
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <div className="max-w-[90%] p-3 rounded-lg shadow-md bg-red-100 text-red-700 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t border-purple-100 mt-auto">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 border-purple-200 focus:border-purple-400"
                disabled={loading}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                disabled={loading || !inputMessage.trim()}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Send Message</span>
              </Button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  )
}
