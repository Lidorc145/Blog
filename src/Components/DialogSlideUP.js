import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class DialogSlideUP extends React.Component{
    constructor(props) {
        super(props);
    }


    handleClose = () => {

        this.props.parentSetState({dialog: false});
    };

    render(props) {
        return (
            <div>
                <Dialog
                    open={this.props.dialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.props.dialogContent}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default DialogSlideUP;