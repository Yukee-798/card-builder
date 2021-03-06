import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, Modal, Input } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons';
import Displayer from './components/Displayer/displayer';
import Console from './components/Console/console';
import { IFile } from './types';
import './App.scss';
const { ipcRenderer } = window.require('electron');

function App() {

  const [isPopConsole, setIsPopConsole] = useState(false);
  const [picList, setPicList] = useState<Pick<IFile, 'name' | 'path'>[]>([]);
  const inputRef = useRef(new Input({ defaultValue: '' }));

  useEffect(() => {
    ipcRenderer.on('create_done', (event: any, imgName: string) => {
      alert(imgName + '.png 已生成到桌面');
    })
  }, [])


  return (
    <div className="App">
      <Row>
        <Col span={24}>
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

              Modal.info({
                title: '请为图片命名',
                content: <Input ref={inputRef} />,
                closable: true,
                okText: '确定',
                onOk: () => {
                  const imgName = inputRef.current.state.value;
                  if (!imgName) {
                    alert('图片名字不能为空');
                  } else {
                    setIsPopConsole(() => {
                      setTimeout(() => {
                        ipcRenderer.send('create', imgName);
                      }, 500);
                      return false;
                    })

                  }
                }
              })
            }}

            // 当文件数量达到2个后，继续上传文件不会再执行回调
            onFileUpload={(file) => {

              const mFile = {
                path: file.path,
                name: file.name
              }

              if (picList.length < 2)
                setPicList(pre => {
                  ipcRenderer.send('cacheFile', JSON.stringify({
                    picList,
                    file: mFile
                  }));
                  return [...pre, mFile]
                });

            }}


          />
          <Button
            className='float-btn'
            icon={<MenuFoldOutlined />}
            onClick={() => {
              setIsPopConsole(true);
            }}
          >
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
