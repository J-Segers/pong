import java.awt.*;

public class Ball {
    private int x;
    private int y;
    private int cx;
    private int cy;
    private int speed;
    private int size;
    private Color color;

    public Ball(int x, int y, int cx, int cy, int speed, int size, Color color) {
        this.x = x;
        this.y = y;
        this.cx = cx;
        this.cy = cy;
        this.speed = speed;
        this.size = size;
        this.color = color;
    }

    public void paint(Graphics graphics) {
        graphics.setColor(color);
        graphics.fillOval(x, y, size, size);
    }

    public void moveBall() {
        x += cx;
        y += cy;
    }

    public void bounceOffEdges(int top, int bottom ) {
        if(y > bottom - size) {
            reverseY();
        }

        if (y < top) {
            reverseY();
        }

    }

    private void reverseY() {
        cy *= -1;
    }

    private void reverseX() {
        cx *= -1;
    }

    public int getY() {
        return y;
    }
}
