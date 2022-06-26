import robot from 'robotjs';
import Jimp from 'jimp';

const mousePosition = async (alias: string = 'mouse_position'): Promise<string> => {
    const position = robot.getMousePos();

    return `${alias} ${position.x},${position.y}`;
};

const mouseUp = async (shift: number): Promise<string> => {
    const position = robot.getMousePos();

    robot.moveMouse(position.x, position.y - shift);

    return await mousePosition('mouse_up');
};

const mouseDown = async (shift: number): Promise<string> => {
    const position = robot.getMousePos();

    robot.moveMouse(position.x, position.y + shift);

    return await mousePosition('mouse_down');
};

const mouseRight = async (shift: number): Promise<string> => {
    const position = robot.getMousePos();

    let x = position.x + shift;

    robot.moveMouse(position.x + shift, position.y);

    return await mousePosition('mouse_right');
};

const mouseLeft = async (shift: number): Promise<string> => {
    const position = robot.getMousePos();

    robot.moveMouse(position.x - shift, position.y);

    return await mousePosition('mouse_left');
};

const circle = async (radius: number) => {
    // https://www.webtips.dev/drawing-with-robot-js
    const mousePos = robot.getMousePos();

    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x = mousePos.x + (radius * Math.cos(i));
        const y = mousePos.y + (radius * Math.sin(i));

        robot.dragMouse(x, y);
    }
};

const drawLineX = (length: number, direction: number) => {
    const position = robot.getMousePos();

    for (let i = 0; i < length; i++) {
        const y = position.y + direction * i;

        robot.dragMouse(position.x, y);
    }
};

const drawLineY = (width: number, direction: number) => {
    const position = robot.getMousePos();

    for (let i = 0; i < width; i++) {
        const x = position.x + direction * i;

        robot.dragMouse(x, position.y);
    }
};

const rectangle = async (width: number, height: number) => {
    drawLineX(width, 1);
    drawLineY(height, 1);
    drawLineX(width, -1);
    drawLineY(height, -1);
};

const square = async (width: number) => {
    await rectangle(width, width);
};

const screenshot = async (): Promise<string> => {
    const size = 200;

    const position = robot.getMousePos();

    const source = robot.screen.capture(position.x - size / 2, position.y - size / 2, size, size);

    const screenshot = new Jimp({
            data: source.image,
            height: size,
            width: size
        }
    );

    const base64 = await screenshot.getBufferAsync(Jimp.MIME_PNG);

    return `prnt_scrn ${base64.toString('base64')}`;
};

export default {
    mouse_position: mousePosition,
    mouse_up: mouseUp,
    mouse_down: mouseDown,
    mouse_left: mouseLeft,
    mouse_right: mouseRight,
    draw_circle: circle,
    draw_rectangle: rectangle,
    draw_square: square,
    prnt_scrn: screenshot
}
