import { useEffect, useState, FunctionComponent, Component, FC } from "react";
import { gameEngine } from "../Class/GameEngine";
import Character from "./Character";
import DomGameObject from "./DomGameObject";
import Enemy from "./Enemy";
import GameOver from "./GameOver";
import ZombieGroup from "../assets/sound/zombie/zs2.mp3";

const GameBoard = () => {
  return (
    <>
      <div className="gameBoard">
        {gameEngine.enemies.map((enemy) => {
          return <Enemy key={enemy.id} item={enemy}></Enemy>;
        })}
        <Character />
        {gameEngine.bullets.map((bullet) => {
          return <DomGameObject key={bullet.id} item={bullet}></DomGameObject>;
        })}
      </div>

      <GameOver status={gameEngine.status} />
    </>
  );
};

export default GameBoard;
