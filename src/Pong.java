import javax.swing.*;
import java.awt.*;

public class Pong extends JPanel {
    static final int WINDOW_WIDTH = 640;
    static final int WINDOW_HEIGHT = 480;

    private Ball gameBall;

    public Pong() {
        gameBall = new Ball(320, 220, 3, 3, 3, 10, Color.MAGENTA);

    }

    public void paintComponent(Graphics graphics) {
        graphics.setColor(Color.BLACK);
        graphics.fillRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT);

        gameBall.paint(graphics);
    }

    public void gameLogic() {

        gameBall.bounceOffEdges(0, WINDOW_HEIGHT);
        gameBall.moveBall();

    }

}
