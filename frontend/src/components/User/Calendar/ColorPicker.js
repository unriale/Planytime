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
    <UncontrolledDropdown>
      <DropdownToggle
        caret
        style={{ backgroundColor: selectedColor || defaultColor }}
      >
        Event Color
      </DropdownToggle>
      <DropdownMenu
        style={{ width: "100px", height: "150px", overflow: "auto" }}
      >
        {(colorList || []).map((color) => populateColors(color))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default ColorPicker;
