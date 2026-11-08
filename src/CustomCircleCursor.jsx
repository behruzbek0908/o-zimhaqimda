import { useEffect, useRef } from 'react'

function CustomCircleCursor() {
    const cursorRef = useRef(null)
    const ringRef = useRef(null)
    const dotRef = useRef(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const ring = ringRef.current
        const dot = dotRef.current
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

        if (!cursor || !ring || !dot || !finePointer.matches) return

        let targetX = -100
        let targetY = -100
        let ringX = targetX
        let ringY = targetY
        let animationFrame = 0

        const animate = () => {
            ringX += (targetX - ringX) * 0.2
            ringY += (targetY - ringY) * 0.2
            ring.style.left = `${ringX}px`
            ring.style.top = `${ringY}px`

            if (Math.abs(targetX - ringX) > 0.1 || Math.abs(targetY - ringY) > 0.1) {
                animationFrame = window.requestAnimationFrame(animate)
            } else {
                animationFrame = 0
            }
        }

        const handlePointerMove = (event) => {
            if (event.pointerType === 'touch') return

            targetX = event.clientX
            targetY = event.clientY
            dot.style.left = `${targetX}px`
            dot.style.top = `${targetY}px`
            cursor.classList.add('is-visible')

            const target = event.target instanceof Element ? event.target : null
            const interactive = target?.closest(
                'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-hover]',
            )
            ring.classList.toggle('is-hovering', Boolean(interactive))

            if (!animationFrame) animationFrame = window.requestAnimationFrame(animate)
        }

        const handlePointerLeave = () => {
            cursor.classList.remove('is-visible')
            ring.classList.remove('is-hovering')
        }

        document.documentElement.classList.add('has-custom-circle-cursor')
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        document.addEventListener('pointerleave', handlePointerLeave)

        return () => {
            document.documentElement.classList.remove('has-custom-circle-cursor')
            window.removeEventListener('pointermove', handlePointerMove)
            document.removeEventListener('pointerleave', handlePointerLeave)
            window.cancelAnimationFrame(animationFrame)
        }
    }, [])

    return (
        <div ref={cursorRef} aria-hidden="true" className="custom-circle-cursor pointer-events-none fixed inset-0 z-[70]">
            <span ref={ringRef} className="custom-circle-cursor__ring" />
            <span ref={dotRef} className="custom-circle-cursor__dot" />
        </div>
    )
}

export default CustomCircleCursor