import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../../../shared/utils";
import styles from "./DashboardMenus.module.css";

export const ActionMenu = ({
    trigger,
    children,
    className,
    isRightAligned,
    isTopAligned,
    gap = 8,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPositioned, setIsPositioned] = useState(false);
    const [coords, setCoords] = useState({
        top: 0,
        left: 0,
        transformOrigin: "top left",
    });

    const triggerRef = useRef(null);
    const menuRef = useRef(null);

    const computeAndSetPosition = useCallback(() => {
        const triggerEl = triggerRef.current;
        const menuEl = menuRef.current;
        if (!triggerEl || !menuEl) return;

        const t = triggerEl.getBoundingClientRect();
        const m = menuEl.getBoundingClientRect();

        const hitsRight =
            isRightAligned || t.left + m.width > window.innerWidth;
        const hitsBottom =
            isTopAligned || t.bottom + m.height > window.innerHeight;

        const top = hitsBottom
            ? t.top + window.scrollY - m.height - gap
            : t.bottom + window.scrollY + gap;

        const left = hitsRight
            ? t.right + window.scrollX - m.width
            : t.left + window.scrollX;

        setCoords({
            top,
            left,
            transformOrigin: `${hitsBottom ? "bottom" : "top"} ${
                hitsRight ? "right" : "left"
            }`,
        });
    }, [gap, isRightAligned, isTopAligned]);

    const toggleMenu = (e) => {
        e.stopPropagation();
        if (!isOpen) {
            setIsOpen(true);
            setIsPositioned(false);
        } else {
            setIsOpen(false);
        }
    };

    useLayoutEffect(() => {
        const initPosition = () => {
            if (!isOpen) return;
            computeAndSetPosition();
            setIsPositioned(true);
        }

        initPosition();
    }, [isOpen, computeAndSetPosition]);

    useEffect(() => {
        if (!isOpen) return;
        const onMove = () => computeAndSetPosition();
        window.addEventListener("resize", onMove);
        window.addEventListener("scroll", onMove, true);
        return () => {
            window.removeEventListener("resize", onMove);
            window.removeEventListener("scroll", onMove, true);
        };
    }, [isOpen, computeAndSetPosition]);

    useEffect(() => {
        if (!isOpen || !menuRef.current) return;
        const ro = new ResizeObserver(() => computeAndSetPosition());
        ro.observe(menuRef.current);
        return () => ro.disconnect();
    }, [isOpen, computeAndSetPosition]);

    return (
        <>
            <div ref={triggerRef} onClick={toggleMenu} className="inline-block">
                {trigger}
            </div>

            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-100"
                                onClick={() => setIsOpen(false)}
                            />

                            <motion.div
                                ref={menuRef}
                                initial={false}
                                animate={
                                    isPositioned
                                        ? { opacity: 1, scale: 1, y: 0 }
                                        : { opacity: 0, scale: 1, y: 0 }
                                }
                                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 35,
                                }}
                                style={{
                                    position: "absolute",
                                    top: coords.top,
                                    left: coords.left,
                                    transformOrigin: coords.transformOrigin,
                                    zIndex: 9999,
                                    minWidth: 200,

                                    visibility: isPositioned
                                        ? "visible"
                                        : "hidden",
                                }}
                                className={cn(
                                    "rounded-xl shadow-md backdrop-blur-sm py-2",
                                    styles.menuContainer,
                                    className
                                )}
                            >
                                <div onClick={(e) => e.stopPropagation()}>
                                    {children}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};


export const Modal = ({
    trigger,
    children,
    className,
    size = "base",
    isOpen,
    closeFn,
    ...props
}) => {
    const triggerRef = useRef(null);

    const sizeMap = {
        base: {
            min: "200px",
            desired: "25dvw",
            max: "400px",
        },
        md: {
            min: "300px",
            desired: "50dvw",
            max: "600px",
        },
        lg: {
            min: "300px",
            desired: "66dvw",
            max: "900px",
        },
    };

    const { min, desired, max } = sizeMap[size];

    return (
        <>
            <div
                ref={triggerRef}
                className="inline-block"
            >
                {trigger}
            </div>

            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div
                            className={cn(
                                "grid place-content-center fixed inset-0 z-200 backdrop-blur-xs",
                                styles.modalBackground
                            )}
                            onClick={(e) => closeFn(e)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                style={{
                                    width: `clamp(${min}, ${desired}, ${max})`,
                                    height: "auto",
                                }}
                                className={cn(
                                    "shadow-lg rounded-2xl",
                                    styles.modalContainer,
                                    className
                                )}
                                onClick={(e) => e.stopPropagation()}
                                {...props}
                            >
                                {children}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};
