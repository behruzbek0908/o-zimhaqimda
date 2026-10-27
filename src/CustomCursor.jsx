import { useEffect, useRef } from 'react'

const colors = ['#67e8f9', '#22d3ee', '#a5f3fc', '#f0abfc']

function CustomCursor() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        const coarsePointer = window.matchMedia('(pointer: coarse)')

        if (!canvas || !context || reduceMotion.matches || coarsePointer.matches) return

        let particles = []
        let animationFrame = 0
        let previousPoint = null
        let pixelRatio = 1

        const resizeCanvas = () => {
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = window.innerWidth * pixelRatio
            canvas.height = window.innerHeight * pixelRatio
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        }

        const animate = () => {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight)
            context.globalCompositeOperation = 'lighter'

            particles = particles.filter((particle) => particle.life > 0)
            particles.forEach((particle) => {
                particle.life -= particle.fade
                particle.x += particle.vx
                particle.y += particle.vy
                particle.radius *= 0.985

                const opacity = Math.max(particle.life, 0)
                const glow = context.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.radius,
                )
                glow.addColorStop(0, `${particle.color}${Math.round(opacity * 210).toString(16).padStart(2, '0')}`)
                glow.addColorStop(1, `${particle.color}00`)
                context.fillStyle = glow
                context.beginPath()
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                context.fill()
            })

            context.globalCompositeOperation = 'source-over'
            if (particles.length) {
                animationFrame = window.requestAnimationFrame(animate)
            } else {
                animationFrame = 0
            }
        }

        const addParticle = (x, y, directionX, directionY) => {
            particles.push({
                x,
                y,
                vx: -directionX * 0.08 + (Math.random() - 0.5) * 0.7,
                vy: -directionY * 0.08 + (Math.random() - 0.5) * 0.7,
                radius: 5 + Math.random() * 7,
                life: 1,
                fade: 0.018 + Math.random() * 0.018,
                color: colors[Math.floor(Math.random() * colors.length)],
            })

            if (particles.length > 100) particles.splice(0, particles.length - 100)
            if (!animationFrame) animationFrame = window.requestAnimationFrame(animate)
        }

        const handlePointerMove = (event) => {
            if (event.pointerType === 'touch') return

            const point = { x: event.clientX, y: event.clientY }
            const directionX = previousPoint ? point.x - previousPoint.x : 0
            const directionY = previousPoint ? point.y - previousPoint.y : 0
            const distance = Math.hypot(directionX, directionY)
            const count = Math.min(4, Math.max(1, Math.ceil(distance / 14)))

            for (let index = 0; index < count; index += 1) {
                const progress = (index + 1) / count
                addParticle(
                    point.x - directionX * (1 - progress),
                    point.y - directionY * (1 - progress),
                    directionX,
                    directionY,
                )
            }

            previousPoint = point
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('pointermove', handlePointerMove, { passive: true })

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('pointermove', handlePointerMove)
            window.cancelAnimationFrame(animationFrame)
            particles = []
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
            style={{ pointerEvents: 'none' }}
        />
    )
}

export default CustomCursor