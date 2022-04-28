import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteProductAlert(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDisagree = (e) => {
    setOpen(false);
    props.toggledeleteProductAlert(e);
    console.log("husl");
  };
  const handleAgree=(e)=>{
      e.stopPropagation();
      props.deleteProduct();
      props.toggledeleteProductAlert(e);

  }
  React.useEffect(()=>{
      setOpen(true);
  })

  return (
    <div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={e=>{handleDisagree(e)}}
        
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you really want to delete this product"}
       
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
   Once you delete Product.This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e=>{handleDisagree(e)}}>N0</Button>
          <Button onClick={e=>{handleAgree(e)}}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
