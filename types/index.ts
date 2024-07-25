
export interface CtxOptions {
    // 画线宽度
    lineWidth: number;
    // 画线颜色
    lineColor: string;
}
// 从服务器发送到客户端的事件。
// 将服务器接收到的绘图数据广播给其他连接的客户端，
// 以实现实时协作绘图功能
export interface ServerToClientEvents {
    /**
     * 
     * @param newMoves 包含一系列坐标点 [x, y]，用于绘制新的线条。
     * @param options 一个 CtxOptions 类型的对象，用于设置线的样式。
     */
    socket_draw: (newMoves: [number, number][], options: CtxOptions) => void;
}

// 客户端将自己的绘图数据发送到服务器，
// 以便服务器可以广播给其他客户端或保存到数据库

export interface ClientToServerEvents {
    draw: (moves: [number, number][], options: CtxOptions) => void;
}
