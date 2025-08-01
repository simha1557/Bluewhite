import StarBorder from '@/components/ui/StarBorder'

export default function TestStarBorderPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="space-y-8">
        <h1 className="text-white text-2xl font-bold text-center mb-8">
          StarBorder Component Test
        </h1>
        
        {/* Test different configurations */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-white text-lg mb-2">Default Configuration</h2>
            <StarBorder
              as="button"
              color="magenta"
              speed="5s"
              thickness={3.7}
            >
              Let's Talk
            </StarBorder>
          </div>
          
          <div className="text-center">
            <h2 className="text-white text-lg mb-2">Cyan Color</h2>
            <StarBorder
              as="button"
              color="cyan"
              speed="3s"
              thickness={3.7}
            >
              Test Button
            </StarBorder>
          </div>
          
          <div className="text-center">
            <h2 className="text-white text-lg mb-2">Purple Color</h2>
            <StarBorder
              as="button"
              color="purple"
              speed="7s"
              thickness={3.7}
            >
              Another Test
            </StarBorder>
          </div>
        </div>
        
        <div className="text-center text-white text-sm mt-8">
          <p>Check if you can see the animated star borders around each button.</p>
          <p>Each button should have a colored border that animates smoothly.</p>
        </div>
      </div>
    </div>
  )
} 