import classes from "./ModeButton.module.css";
const ModeButton = (props) => {
  return (
    <label className={classes.switch}>
      <input className={classes.circle} type="checkbox" name="" id="" />
      <span className={classes.slider}></span>
    </label>
  );
};
export default ModeButton;
