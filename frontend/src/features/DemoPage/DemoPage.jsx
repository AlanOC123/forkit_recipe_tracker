import React, { useRef } from "react";
import { Button } from "../../shared/components";
import { ButtonGroup } from "../../shared/components";

export const DemoPage = () => {
    // 1. Create a ref to access the DOM node of the middle button
    const middleButtonRef = useRef(null);

    const handleFocusMiddle = () => {
        // This only works because we used React.forwardRef in Button.jsx!
        if (middleButtonRef.current) {
            middleButtonRef.current.focus();
            // Let's also animate it a bit to show we have control
            middleButtonRef.current.style.transform = "scale(1.1)";
            setTimeout(() => {
                middleButtonRef.current.style.transform = "scale(1)";
            }, 200);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-10 flex flex-col items-center gap-10">
            <h1 className="text-3xl font-bold text-primary">
                Component Architecture Demo
            </h1>

            {/* Section 1: Button Group (Showcasing cloneElement) */}
            <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold text-gray-400">
                    1. The Button Group (cloneElement magic)
                </h2>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                    These are normal Buttons. The parent Group clones them and
                    forces 'rounded-none' and border logic onto them
                    automatically.
                </p>

                {/* Horizontal Group */}
                <ButtonGroup>
                    <Button variant="outline">Years</Button>
                    {/* Attach ref to this one */}
                    <Button ref={middleButtonRef} variant="outline">
                        Months
                    </Button>
                    <Button variant="outline">Days</Button>
                </ButtonGroup>

                {/* Vertical Group */}
                <div className="mt-4">
                    <ButtonGroup orientation="vertical">
                        <Button variant="secondary">Top</Button>
                        <Button variant="secondary">Middle</Button>
                        <Button variant="secondary">Bottom</Button>
                    </ButtonGroup>
                </div>
            </div>

            {/* Section 2: Ref Forwarding */}
            <div className="space-y-4 text-center border-t border-gray-800 pt-8">
                <h2 className="text-xl font-semibold text-gray-400">
                    2. Ref Forwarding
                </h2>
                <p className="text-sm text-gray-500">
                    Clicking the button below uses a Ref to find the "Months"
                    button above and focus it directly.
                </p>

                <Button variant="default" onClick={handleFocusMiddle}>
                    Focus "Months" Button
                </Button>
            </div>
        </div>
    );
};
