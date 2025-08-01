export default function TestAnimationPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="space-y-8">
        <h1 className="text-white text-2xl font-bold text-center mb-8">
          Star Animation Test
        </h1>
        
        {/* Test individual animations */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-white text-lg mb-2">Star Flow Animation</h2>
            <div className="w-32 h-8 bg-gray-800 rounded-lg relative overflow-hidden">
              <div className="flex space-x-2 animate-star-flow">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-magenta animate-star-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-white text-lg mb-2">Star Pulse Animation</h2>
            <div className="flex justify-center space-x-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-cyan animate-star-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-white text-lg mb-2">Vertical Flow Animation</h2>
            <div className="w-8 h-32 bg-gray-800 rounded-lg relative overflow-hidden mx-auto">
              <div className="flex flex-col space-y-2 animate-star-flow-vertical">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-purple animate-star-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-white text-sm mt-8">
          <p>Check if you can see the star particles moving and pulsing.</p>
          <p>Each animation should show smooth movement and pulsing effects.</p>
        </div>
      </div>
    </div>
  )
} 