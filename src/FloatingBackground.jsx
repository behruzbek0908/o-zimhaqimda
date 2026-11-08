import { useEffect, useRef } from 'react'

const orbs = [
    { x: 8, y: 12, size: 150, color: '103, 232, 249', duration: 22, delay: -6 },
    { x: 28, y: 24, size: 92, color: '129, 140, 248', duration: 27, delay: -18 },
    { x: 51, y: 10, size: 125, color: '45, 212, 191', duration: 25, delay: -11 },
    { x: 77, y: 20, size: 180, color: '192, 132, 252', duration: 30, delay: -21 },
    { x: 94, y: 43, size: 100, color: '103, 232, 249', duration: 24, delay: -3 },
    { x: 15, y: 51, size: 115, color: '251, 146, 60', duration: 29, delay: -14 },
    { x: 39, y: 43, size: 72, color: '244, 114, 182', duration: 23, delay: -9 },
    { x: 63, y: 57, size: 160, color: '56, 189, 248', duration: 31, delay: -24 },
    { x: 84, y: 69, size: 110, color: '250, 204, 21', duration: 26, delay: -16 },
    { x: 4, y: 83, size: 130, color: '167, 139, 250', duration: 28, delay: -5 },
    { x: 27, y: 91, size: 82, color: '45, 212, 191', duration: 21, delay: -12 },
    { x: 49, y: 78, size: 105, color: '251, 113, 133', duration: 32, delay: -27 },
    { x: 72, y: 94, size: 145, color: '103, 232, 249', duration: 27, delay: -8 },
    { x: 96, y: 9, size: 68, color: '251, 146, 60', duration: 24, delay: -19 },
]

function FloatingBackground() {
    const layerRef = useRef(null)
    const pointerRef = useRef(null)
    const frameRef = useRef(0)

    useEffect(() => {
        const layer = layerRef.current
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

        if (!layer || !finePointer.matches) return

        const orbElements = Array.from(layer.children)
        const updateRepulsion = () => {
            frameRef.current = 0
            const pointer = pointerRef.current

            orbElements.forEach((element, index) => {
                if (!pointer) {
                    element.style.transform = 'translate3d(0, 0, 0)'
                    return
                }

                const orb = orbs[index]
                const centerX = (window.innerWidth * orb.x) / 100 + orb.size / 2
                const centerY = (window.innerHeight * orb.y) / 100 + orb.size / 2
                const deltaX = centerX - pointer.x
                const deltaY = centerY - pointer.y
                const distance = Math.hypot(deltaX, deltaY)
                const radius = 190
                const strength = distance < radius ? ((radius - distance) / radius) * 22 : 0
                const divisor = distance || 1

                element.style.transform = `translate3d(${(deltaX / divisor) * strength}px, ${(deltaY / divisor) * strength}px, 0)`
            })
        }

        const handlePointerMove = (event) => {
            pointerRef.current = { x: event.clientX, y: event.clientY }
            if (!frameRef.current) frameRef.current = window.requestAnimationFrame(updateRepulsion)
        }

        const handlePointerLeave = () => {
            pointerRef.current = null
            if (!frameRef.current) frameRef.current = window.requestAnimationFrame(updateRepulsion)
        }

        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerleave', handlePointerLeave)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerleave', handlePointerLeave)
            window.cancelAnimationFrame(frameRef.current)
        }
    }, [])

    return (
        <div
            ref={layerRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
            {orbs.map((orb, index) => (
                <span
                    key={index}
                    className="floating-orb pointer-events-none absolute block rounded-full"
                    style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        transitionDelay: `${(index % 4) * 18}ms`,
                    }}
                >
                    <span
                        className="floating-orb__glow block h-full w-full rounded-full"
                        style={{
                            background: `radial-gradient(circle at 35% 35%, rgba(${orb.color}, 0.28), rgba(${orb.color}, 0.08) 48%, transparent 74%)`,
                            animationDuration: `${orb.duration}s`,
                            animationDelay: `${orb.delay}s`,
                        }}
                    />
                </span>
            ))}
        </div>
    )
}

export default FloatingBackground