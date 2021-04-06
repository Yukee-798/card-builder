import React, { useState } from 'react';
import { Row, Col, Button } from 'antd'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import './App.scss';
import Displayer from './components/Displayer/displayer';
import Console from './components/Console/console';

function App() {

  const [isPopConsole, setIsPopConsole] = useState(false);

  return (
    <div className="App">
      <Row>
        <Col span={24}>
          {/* <DragDropContext
            onDragEnd={(r, p) => {console.log(r, p);}}
          > */}
            <Displayer />
            <Console
              isPop={isPopConsole}
              onClose={() => {
                setIsPopConsole(false);
              }}
            />

            {/* <Draggable
              draggableId='123'
              
            >
              <div id='123'>231</div>
            </Draggable> */}


            <Button
              className='float-btn'
              icon={<MenuFoldOutlined />}
              onClick={() => {
                setIsPopConsole(true);
              }}
            >
            </Button>


          {/* </DragDropContext> */}
        </Col>
      </Row>
    </div>
  );
}

export default App;
