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
import { IFile } from './types';


const { ipcRenderer } = window.require('electron');
ipcRenderer.on('reply', (event: any, args: any) => {
  console.log(args);
})

function App() {

  const [isPopConsole, setIsPopConsole] = useState(false);
  const [picList, setPicList] = useState<Pick<IFile, 'name' | 'path'>[]>([]);



  return (
    <div className="App">
      <Row>
        <Col span={24}>
          {/* <DragDropContext
            onDragEnd={(r, p) => {console.log(r, p);}}
          > */}
          <Displayer
            loadPic={picList}
          />
          <Console
            isPop={isPopConsole}
            onClose={() => {
              setIsPopConsole(false);
            }}
            onRemake={() => {
              ipcRenderer.send('remake', JSON.stringify(picList));
              setPicList([]);
            }}

            onCreate={() => {

            }}

            // 当文件数量达到3个后，继续上传文件不会再执行回调
            onFileUpload={(file) => {

              const mFile = {
                path: file.path,
                name: file.name
              }

              setPicList(pre => {
                ipcRenderer.send('cacheFile', JSON.stringify({
                  picList,
                  file: mFile
                }));
                return [...pre, mFile]
              });
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
