import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;

public class Pong extends JPanel implements MouseMotionListener {
    static final int WINDOW_WIDTH = 640;
    static final int WINDOW_HEIGHT = 480;

    private Ball gameBall;
    private Paddle userPaddle;

    private Paddle aiPaddle;

    private int userMouseY;

    public Pong() {

        userPaddle = new Paddle(60, 10, 210, 5, Color.WHITE);
        aiPaddle = new Paddle(60, 615, 210, 5, Color.WHITE);

        gameBall = new Ball(320, 220, 3, 3, 3, 10, Color.MAGENTA);

        userMouseY = 0;
        addMouseMotionListener(this);

    }

    public void paintComponent(Graphics graphics) {
        graphics.setColor(Color.BLACK);
        graphics.fillRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT);

        userPaddle.paint(graphics);
        aiPaddle.paint(graphics);

        gameBall.paint(graphics);
    }

    public void gameLogic() {

        gameBall.bounceOffEdges(0, WINDOW_HEIGHT);
        gameBall.moveBall();

        userPaddle.moveTo(userMouseY);
        aiPaddle.moveTo(gameBall.getY());

    }

    @Override
    public void mouseDragged(MouseEvent e) {

    }

    @Override
    public void mouseMoved(MouseEvent e) {

        userMouseY = e.getY();

    }
}
