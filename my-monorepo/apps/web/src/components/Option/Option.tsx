import type { OptionList } from "../../types/attributes";

interface OptionProps {
  list: OptionList;
  selectedValue: string;
  onItemSelect: (id: string) => void;
  ariaLabel: string;
  ariaDescribedby: string;
  listboxClassName: string;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  listboxId: string;
}

const Option = ({
  list = [],
  selectedValue,
  onItemSelect,
  ariaLabel,
  ariaDescribedby,
  listboxClassName,
  onMouseEnter,
  onMouseLeave,
  listboxId,
}: OptionProps) => {
  const handleItemClick = (id: string, disabled?: boolean) => {
    if (!disabled) onItemSelect(id);
  };
  return (
    <ul
      id={listboxId}
      role="listbox"
      aria-label={ariaLabel}
      aria-multiselectable="false"
      data-testid="option-container"
      aria-describedby={ariaDescribedby}
      className={listboxClassName}
    >
      {list.map((item) => (
        <li
          role="option"
          key={item.id}
          id={`option-${item.id}`}
          aria-selected={selectedValue === item.id}
          onClick={() => handleItemClick(item.id, item.disabled)}
          aria-disabled={item.disabled}
          className={item.optionClassName}
          onMouseEnter={() => onMouseEnter?.(item.id)}
          onMouseLeave={() => onMouseLeave?.()}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default Option;
