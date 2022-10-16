import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Board } from './board/Board'
import { TaskProvider } from '../context/TaskProvider'
import { SideMenu } from './sidemenu/SideMenu'
import { getBoards } from '../services/boards'
import { BoardModel } from '../model/BoardModel'

export const Main = () => {

  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const [boards, setBoards] = useState<BoardModel[] | null>(null);

  useEffect(() => {
    getBoards()
      .then(boards =>
        setBoards(boards.map((board: any) => 
          new BoardModel(board.name, board.tag, board.users))));
  }, []);

  return (
    <Box 
      sx={{ 
        display: 'flex'
    }}>
      <SideMenu visible={sideMenuOpen} />
      <TaskProvider>
        { boards && <Board sideMenuToggle={setSideMenuOpen} sideMenuOpen={sideMenuOpen} boardInfo={boards && boards[0]} /> }
      </TaskProvider>
    </Box>
  )
}
