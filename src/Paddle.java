import java.awt.*;

public class Paddle {
    private int height;
    private int x;
    private int y;
    private int speed;
    private Color color;
    static final int PADDLE_WIDTH = 15;

    public Paddle(int height, int x, int y, int speed, Color color) {
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
    }

    public void paint(Graphics graphics) {
        graphics.setColor(color);
        graphics.fillRect(x, y, PADDLE_WIDTH, height);
    }

    public void moveTo(int yDestination) {
        int centerY = y + height / 2;

        if (centerY > yDestination) {
            y -= speed;
        }

        if (centerY < yDestination) {
            y += speed;
        }
    }
}
