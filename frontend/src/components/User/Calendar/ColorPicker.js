import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ColorPicker = ({
  colorList,
  selectedColor,
  defaultColor,
  setSelectedColor,
}) => {
  const populateColors = (color) => {
    return (
      <DropdownItem
        key={color.id}
        style={{
          backgroundColor: color.color,
          height: "2em",
          marginBottom: "0.15em",
        }}
        onClick={() => setSelectedColor(color.id)}
        className="colorBox-cursor"
      />
    );
  };

  return (
    <UncontrolledDropdown style={{ marginTop: "1.5em" }}>
      <DropdownToggle
        caret
        style={{ backgroundColor: selectedColor || defaultColor }}
      >
        Event Color
      </DropdownToggle>
      <DropdownMenu>
        {(colorList || []).map((color) => populateColors(color))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default ColorPicker;
