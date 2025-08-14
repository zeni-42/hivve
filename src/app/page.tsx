"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Users,
    Briefcase,
    TrendingUp,
    MessageSquare,
    Search,
    UserPlus,
    CheckCircle,
    Star,
    ArrowRight,
    Github,
    Mail,
    Twitter,
    BarChart3,
    Network,
} from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.1 },
    },
}

const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
}

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Navigation */}
        <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Hivve
                </span>
                </motion.div>

                <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Features
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                    How It Works
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Stories
                </a>
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
                    Sign In
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Get Started
                </Button>
                </div>
            </div>
            </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-8" >
                <div className="space-y-4">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} >
                    <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
                        🚀 The Future of Professional Networking
                    </Badge>
                    </motion.div>

                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Connect, Grow, and{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Thrive Professionally
                    </span>
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                    Hivve revolutionizes how students and professionals connect, discover opportunities, and build
                    meaningful careers. Join thousands who've transformed their professional journey.
                    </p>
                </div>

                <motion.div className="flex flex-col sm:flex-row gap-4" variants={staggerContainer} initial="initial" animate="animate">
                    <motion.div variants={fadeInUp} {...scaleOnHover}>
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4">
                        Start Your Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className="flex items-center space-x-6 pt-4">
                    <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">2,500+</span> students already connected
                    </div>
                </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="relative">
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
                    <div className="space-y-6">
                    {/* Mock app header */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg"></div>
                            <span className="font-semibold text-gray-900">Hivve Dashboard</span>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                    </div>

                    {/* Mock content */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
                            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-sm font-medium text-gray-900">Connections</div>
                            <div className="text-2xl font-bold text-blue-600">247</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center">
                            <Briefcase className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="text-sm font-medium text-gray-900">Opportunities</div>
                            <div className="text-2xl font-bold text-green-600">12</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 text-center">
                            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <div className="text-sm font-medium text-gray-900">Growth</div>
                            <div className="text-2xl font-bold text-purple-600">+23%</div>
                        </div>
                    </div>

                    {/* Mock activity feed */}
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {String.fromCharCode(64 + i)}
                            </div>
                            <div className="flex-1">
                            <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-2xl blur-3xl transform scale-110"></div>
                </motion.div>
            </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center space-y-4 mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Succeed
                </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features designed to accelerate your career growth and professional connections
                </p>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {[
                {
                    icon: Search,
                    title: "Smart Job Discovery",
                    description:
                    "AI-powered job matching that finds opportunities perfectly aligned with your skills and aspirations.",
                },
                {
                    icon: Users,
                    title: "Professional Networking",
                    description:
                    "Connect with industry leaders, mentors, and peers to build meaningful professional relationships.",
                },
                {
                    icon: TrendingUp,
                    title: "Career Analytics",
                    description:
                    "Track your professional growth with detailed insights and personalized career recommendations.",
                },
                {
                    icon: MessageSquare,
                    title: "Smart Messaging",
                    description: "Intelligent conversation starters and networking tools to break the ice professionally.",
                },
                {
                    icon: Briefcase,
                    title: "Portfolio Builder",
                    description: "Showcase your work with beautiful, customizable portfolios that stand out to employers.",
                },
                {
                    icon: UserPlus,
                    title: "Mentorship Matching",
                    description: "Get paired with experienced professionals who can guide your career journey.",
                },
                ].map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                    <Card className="h-full border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
                    <CardHeader className="space-y-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                    </Card>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center space-y-4 mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                How Hivve{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started in minutes and transform your professional journey in three simple steps
                </p>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
            >
                {[
                {
                    step: "01",
                    title: "Create Your Profile",
                    description:
                    "Build a compelling professional profile that showcases your skills, experience, and aspirations.",
                    icon: Users,
                    gradient: "from-blue-500 to-cyan-500",
                },
                {
                    step: "02",
                    title: "Connect & Discover",
                    description:
                    "Use our AI-powered matching to find relevant opportunities, mentors, and professional connections.",
                    icon: Network,
                    gradient: "from-purple-500 to-pink-500",
                },
                {
                    step: "03",
                    title: "Grow Your Career",
                    description:
                    "Leverage insights, build relationships, and accelerate your professional growth with data-driven recommendations.",
                    icon: BarChart3,
                    gradient: "from-green-500 to-emerald-500",
                },
                ].map((step, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center space-y-6">
                    <div className="relative">
                    <div
                        className={`w-64 h-48 mx-auto bg-gradient-to-br ${step.gradient} rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden`}
                    >
                        <step.icon className="h-20 w-20 text-white/80" />
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
                        <div className="absolute top-1/2 right-6 w-6 h-6 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.step}
                    </div>
                    </div>
                    <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center space-y-4 mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                Student{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Success Stories
                </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how Hivve has transformed the careers of students and young professionals
                </p>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
            >
                {[
                {
                    name: "Sarah Chen",
                    role: "Software Engineer at Google",
                    university: "Stanford University",
                    content:
                    "Hivve connected me with my mentor at Google during my sophomore year. The networking features and career insights were game-changing for landing my dream internship.",
                    rating: 5,
                    initials: "SC",
                    gradient: "from-pink-500 to-rose-500",
                },
                {
                    name: "Marcus Johnson",
                    role: "Product Manager at Stripe",
                    university: "MIT",
                    content:
                    "The AI-powered job matching on Hivve helped me discover opportunities I never knew existed. I went from confused about my career to landing multiple offers.",
                    rating: 5,
                    initials: "MJ",
                    gradient: "from-blue-500 to-indigo-500",
                },
                {
                    name: "Priya Patel",
                    role: "UX Designer at Airbnb",
                    university: "UC Berkeley",
                    content:
                    "Building my portfolio on Hivve and connecting with design leaders completely transformed my job search. I received 3x more interview requests.",
                    rating: 5,
                    initials: "PP",
                    gradient: "from-purple-500 to-violet-500",
                },
                ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                    <Card className="h-full border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="space-y-4">
                        <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback
                            className={`bg-gradient-to-br ${testimonial.gradient} text-white font-semibold`}
                            >
                            {testimonial.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-blue-600">{testimonial.role}</p>
                            <p className="text-xs text-gray-500">{testimonial.university}</p>
                        </div>
                        </div>
                        <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 leading-relaxed italic">"{testimonial.content}"</p>
                    </CardContent>
                    </Card>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeInUp} className="space-y-8">
                <h2 className="text-3xl lg:text-5xl font-bold text-white">Ready to Transform Your Career?</h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join thousands of students and professionals who are already building their future with Hivve.
                </p>
                <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                >
                <motion.div variants={fadeInUp} {...scaleOnHover}>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
                <motion.div variants={fadeInUp} {...scaleOnHover}>
                    <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-300 text-white hover:bg-blue-600 text-lg px-8 py-4 bg-transparent"
                    >
                    Schedule Demo
                    </Button>
                </motion.div>
                </motion.div>
                <div className="flex items-center justify-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-blue-100">
                    <CheckCircle className="h-5 w-5" />
                    <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-100">
                    <CheckCircle className="h-5 w-5" />
                    <span>No credit card required</span>
                </div>
                </div>
            </motion.div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
                <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">H</span>
                    </div>
                    <span className="text-xl font-bold">Hivve</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                    Empowering the next generation of professionals through intelligent networking and career development.
                </p>
                <div className="flex space-x-4">
                    <motion.a href="#" {...scaleOnHover} className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                    </motion.a>
                    <motion.a href="#" {...scaleOnHover} className="text-gray-400 hover:text-white transition-colors">
                    <Github className="h-5 w-5" />
                    </motion.a>
                    <motion.a href="#" {...scaleOnHover} className="text-gray-400 hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                    </motion.a>
                </div>
                </div>

                <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Features
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Pricing
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        API
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Integrations
                    </a>
                    </li>
                </ul>
                </div>

                <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        About
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Blog
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Careers
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Contact
                    </a>
                    </li>
                </ul>
                </div>

                <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Help Center
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Community
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Privacy Policy
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Terms of Service
                    </a>
                    </li>
                </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Hivve. All rights reserved. Built with ❤️ for the next generation of professionals.</p>
            </div>
            </div>
        </footer>
        </div>
  )
}
