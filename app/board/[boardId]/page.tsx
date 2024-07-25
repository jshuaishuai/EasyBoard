"use client";

import { Button } from "@/components/ui/button";
import { useDraw } from "@/hooks/use-draw";
import { socket } from "@/lib/socket";
import { CtxOptions } from "@/types";
import { useEffect, useRef, useState } from "react";

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
    if (!params.boardId) {
        return null;
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D>();

    const [size, setSize] = useState({ width: 0, height: 0 });
    const [options, setOptions] = useState<CtxOptions>(
        {
            lineWidth: 1,
            lineColor: "#000"
        });




    const {
        handleDraw,
        handleStartDrawing,
        handleEndDrawing,
        drawing
    } = useDraw(options, ctxRef.current);

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctxRef.current = ctx;
            }
        }
    }, [options.lineWidth, options.lineColor])

    const drawFromSocket = (
        socketMoves: [number, number][],
        socketOptions: CtxOptions
    ) => {
        const tempCtx = ctxRef.current;
        if (tempCtx) {
            tempCtx.lineWidth = socketOptions.lineWidth;
            tempCtx.strokeStyle = socketOptions.lineColor;

            tempCtx.beginPath();
            socketMoves.map(([x, y]) => {
                tempCtx.lineTo(x, y);
                tempCtx.stroke();
            })
            tempCtx.closePath();
        }
    }

    useEffect(() => {
        let movesToDrawLater: [number, number][] = [];
        let optionsToUserLater: CtxOptions = {
            lineColor: "",
            lineWidth: 0,
        };
        socket.on("socket_draw", (movesToDraw: any, socketOptions: any) => {
            if (ctxRef.current && !drawing) {
                drawFromSocket(movesToDraw, socketOptions);
            } else {
                movesToDrawLater = movesToDraw;
                optionsToUserLater = socketOptions;
            }
        })

        return () => {
            socket.off("socket_draw");
            if (movesToDrawLater.length) {
                drawFromSocket(movesToDrawLater, optionsToUserLater);
            }
        }
    }, [drawing]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Button onClick={() => setOptions({ lineColor: "blue", lineWidth: 5 })} className="absolute top-4 right-4">Blue</Button>
            <canvas
                ref={canvasRef}
                width={size.width}
                height={size.height}
                className="w-full h-full"
                onMouseDown={(e) => handleStartDrawing(e.clientX, e.clientY)}
                onMouseUp={handleEndDrawing}
                onMouseMove={(e) => handleDraw(e.clientX, e.clientY)}
            />
        </div>
    );
};

export default BoardIdPage;
