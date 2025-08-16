"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GoogleAuthButton from "@/components/layout/GoogleButton"
import GithubAuthButton from "@/components/layout/GithubButton"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleOAuthSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`)
    // OAuth integration would go here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-0 shadow-2xl shadow-blue-500/10 bg-white/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.3 }}>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome back
              </CardTitle>
            </motion.div>
            <CardDescription className="text-slate-600">Sign in to your Hivve account to continue</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <GoogleAuthButton />
            <GithubAuthButton />

            <div className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link href="/auth/sign-up" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-slate-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="hover:text-slate-700 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-slate-700 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
