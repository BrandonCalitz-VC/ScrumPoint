import bg from '@/public/bg.png'

export default function Auth() {
  return (
   <main className="h-screen w-full bg-white flex justify-center items-center" 
   style={{
    backgroundImage: `url(${bg.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
    }}>
    <div className="bg-black bg-opacity-80 w-60 h-60">
        {/* Your content */}
    </div>
   </main>
  )
}