import { useState } from 'react';
import { Navbar, Button, Card, Alignment, Overlay, Elevation, Classes } from "@blueprintjs/core";
import TodoSettings from './TodoSettings';

function TodoNavbar(props) {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  const openSettings = () => { 
    setSettingsIsOpen(true)
  }
  const closeSettings = () => { 
    setSettingsIsOpen(false)
  }
  
  const overlayOpts = {
        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        hasBackdrop: true,
        usePortal: true,
        useTallContent: false,
    }

  return (
    <>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Todos</Navbar.Heading>
          <Navbar.Divider />
          <Button data-testid="settings-button" onClick={ openSettings }  className="bp4-minimal" icon="settings" text="Settings" />
        </Navbar.Group>
      </Navbar>
      <div>
        <Overlay isOpen={settingsIsOpen} onClose={closeSettings} {...overlayOpts} className={Classes.OVERLAY_SCROLL_CONTAINER}>
          <Card elevation={Elevation.FOUR}>
            <TodoSettings />
          </Card>
        </Overlay>
      </div>
    </>
  );
}

export default TodoNavbar;