import Button from "../Button/Button";
import type { MetaIcon, OptionList } from "../types/attributes";
import Option from "../Option/Option";
import type { AriaCombobox } from "../types/ariaAttributes";
import { useState } from "react";
import { getLabelById } from "../utils/helper";

interface ButtonForSelectProps {
  selectId: string;
  metaIcon: MetaIcon;
  accessabilityForSelectBtn: AriaCombobox;
}

interface OptionForSelectProps {
  optionList: OptionList;
  onSelect: (id: string) => void;
  optionAriaLabel: string;
  optionDescribedby: string;
  listboxClassName: string;
}

interface SelectProps extends ButtonForSelectProps, OptionForSelectProps {
  selectWrapperClassName: string;
}

const Select = ({
  selectId,
  optionList,
  onSelect,
  metaIcon,
  optionAriaLabel,
  optionDescribedby,
  listboxClassName,
  selectWrapperClassName,
  accessabilityForSelectBtn = { ariaHaspopup: "listbox", ariaExpanded: false },
}: SelectProps) => {
  const { ariaHaspopup, ariaControls, ariaExpanded } =
    accessabilityForSelectBtn;
  const [isOpen, setIsOpen] = useState(!!ariaExpanded);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [focusedValue, setFocusedValue] = useState<string>("");

  const listboxId = `listbox-${selectId}`;

  const handleItemSelect = (id: string) => {
    setSelectedValue(id);
    setIsOpen(false);
    onSelect(id);
  };
  const handleMouseEnter = (id: string) => {
    setFocusedValue(id);
  };

  const handleMouseLeave = () => {
    setFocusedValue("");
  };
  return (
    <div role="selectGroup" className={selectWrapperClassName}>
      <Button
        metaIcon={metaIcon}
        id={`selectBtn-${selectId}`}
        ariaAttributes={{
          ariaHaspopup,
          ariaControls,
        }}
        ariaCombobox={{
          ariaExpanded: isOpen,
          ariaActiveDescendant: focusedValue,
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedValue ? getLabelById(optionList, selectedValue) : "Select"}
      </Button>

      {isOpen && (
        <Option
          list={optionList}
          selectedValue={selectedValue}
          onItemSelect={handleItemSelect}
          ariaLabel={optionAriaLabel}
          ariaDescribedby={optionDescribedby}
          listboxClassName={listboxClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          listboxId={listboxId}
        />
      )}
    </div>
  );
};

export default Select;
