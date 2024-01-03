import './globals.css'
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={`${fontSans.variable} font-sans`}>
      <ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>{children}</ThemeProvider>
            
         
        </body>
    </html>
  )
}
