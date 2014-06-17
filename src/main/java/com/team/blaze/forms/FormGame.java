package com.team.blaze.forms;

import com.team.blaze.dao.DAOFactory;
import com.team.blaze.dao.ScoreDAO;
import com.team.blaze.models.ConnectionType;
import com.team.blaze.models.Player;
import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.faces.context.FacesContext;
import javax.faces.event.AjaxBehaviorEvent;
import javax.faces.view.ViewScoped;
import javax.inject.Named;

@Named(value = "formGame")
@ViewScoped
public class FormGame implements Serializable
{
    private static final long serialVersionUID = 1L;
    private final DAOFactory dao;
    private final ScoreDAO scoreDAO;

    private String formHiddenInput;
    private String formName;

    public FormGame()
    {
        this.dao = DAOFactory.getInstance(ConnectionType.Default);
        this.scoreDAO = dao.getScoreDAO();
        System.out.println("Constructor");
    }

    @PostConstruct
    public void loadScores()
    {
        System.out.println("PostConstructor");

        List<Player> players = scoreDAO.listAllPlayers();

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < players.size(); i++)
        {
            sb.append(players.get(i).getPlayerId());
            sb.append(',');
            sb.append(players.get(i).getName());
            sb.append(',');
            sb.append(players.get(i).getScore());

            if (i < players.size() - 1)
            {
                sb.append(',');
            }
        }

        System.out.println("Log Scores: " + sb.toString());
        this.formHiddenInput = sb.toString();

    }

    public String getFormHiddenInput()
    {
        return formHiddenInput;
    }

    public void setFormHiddenInput(String formHiddenInput)
    {
        this.formHiddenInput = formHiddenInput;
    }

    public String getFormName()
    {
        return formName;
    }

    public void setFormName(String formName)
    {
        this.formName = formName;
    }

    public void saveScores(AjaxBehaviorEvent event)
    {
        /*
         System.out.println("Need to be implemeted.");
         System.out.println("Saving " + this.formHiddenInput);
         */

        String value = FacesContext.getCurrentInstance().
                getExternalContext().getRequestParameterMap().get("myform:scores");

        System.out.println(value);
        /*
         List<Player> list = new ArrayList<>();

         String[] splitted = this.formHiddenInput.split(",");

         Player player;
         Player newplayer = null;
         Player deletePlayer = null;
         for (int i = 0; i < splitted.length; i = i + 3)
         {
         long id = Long.parseLong(splitted[i]);

         String name = splitted[i + 1];
         int score = Integer.parseInt(splitted[i + 2]);
         if (id == 11)
         {
         newplayer = new Player(id, score, name);
         }
         player = new Player(id, score, name);
         list.add(player);
         }
         // find missing player.

         scoreDAO.deletePlayer(deletePlayer);
         scoreDAO.createPlayer(newplayer);*/

    }

    public void submit()
    {
        System.out.println("Button");
        System.out.println(this.formHiddenInput);
    }

}
