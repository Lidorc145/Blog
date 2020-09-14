import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

;

function DialogSlideUP(props){
    const handleClose = () => {
        props.parentSetState({dialog: false});
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    })

    return (
                <Dialog
                    open={props.dialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                            {props.dialogContent}
                    </DialogContent>
                </Dialog>
    );

}
export default DialogSlideUP;