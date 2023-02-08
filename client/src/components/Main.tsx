import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Board } from './board/Board'
import { TaskProvider } from '../context/TaskProvider'
import { SideMenu } from './sidemenu/SideMenu'
import { getBoards } from '../services/boards'
import { BoardModel } from '../model/BoardModel'

export const Main = () => {

  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const [boards, setBoards] = useState<BoardModel[]>([]);
  const [board, setBoard] = useState<BoardModel>({} as BoardModel);

  useEffect(() => {
    getBoards()
      .then(res => {
        let b = res.map((board: any) => 
          new BoardModel(board.name, board.tag, board.users));
        setBoards(b);
        setBoard(b[0]);
      });
  }, []);

  const selectBoard = (name: string) => {
    setBoard(boards.find(board => board.name === name) ?? boards[0]);
  }

  const handleNewBoard = (board: BoardModel) => {
    setBoards(boards.concat(board));
  }

  return (
    <Box 
      sx={{ 
        display: 'flex'
    }}>
      <SideMenu visible={sideMenuOpen} boards={boards.map(board => board.name)} handleNewBoard={handleNewBoard} selected={board.name} handleSelect={selectBoard} />
      <TaskProvider>
        <Board sideMenuToggle={setSideMenuOpen} sideMenuOpen={sideMenuOpen} boardInfo={board && board} />
      </TaskProvider>
    </Box>
  )
}
