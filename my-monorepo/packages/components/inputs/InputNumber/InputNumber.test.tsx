import { render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputNumber from "./InputNumber";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";

const ariaSettings = {
  ariaLabel: "number",
  ariaLabelledby: "number-id",
  ariaDescribedby: "describe-id",
  ariaInvalid: true,
  ariaRequired: true,
  ariaDisabled: false,
  ariaReadonly: false,
  ariaValuemin: 20,
  ariaValuemax: 40,
  ariaValuenow: 15,
};

const globalAttributes = {
  id: "number-id",
  className: "numberClass",
  style: { color: "red", padding: "10px" },
  title: "number",
};

const textInputSpecificAttrs = {
  name: "number-input",
  value: 10,
  placeholder: "enter number",
  disabled: true,
  readOnly: true,
  required: true,
};

describe("InputNumber", () => {
  describe("General test", () => {
    it("should been rendered with type=`number`", () => {
      render(<InputNumber />);

      expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
    });
  });

  describe("Global Props:", () => {
    it("should takes id prop", () => {
      render(<InputNumber globalAttributes={globalAttributes} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("id", "number-id");
    });
    it("should takes className prop", () => {
      render(<InputNumber globalAttributes={globalAttributes} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "class",
        "numberClass",
      );
    });
    it("should takes className prop", () => {
      render(<InputNumber globalAttributes={globalAttributes} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "class",
        "numberClass",
      );
    });
    it("should takes style prop", () => {
      render(<InputNumber globalAttributes={globalAttributes} />);
      expect(screen.getByRole("spinbutton")).toHaveStyle({
        color: "rgb(255, 0, 0)",
        padding: "10px",
      });
    });
  });
  describe("Specific attributes", () => {
    it("should accept ref from inputTextRef", () => {
      const { result } = renderHook(() => useRef<HTMLInputElement>(null));

      render(<InputNumber textInputSpecificAttrs={{ ref: result.current }} />);

      expect(result.current.current).toBeInstanceOf(HTMLInputElement);
      expect(result.current.current).toBeInTheDocument();
    });

    it("shuold takes name by props", () => {
      render(<InputNumber textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "name",
        "number-input",
      );
    });
    it("should takes value by props", () => {
      render(<InputNumber textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("value", "10");
    });
    it("should takes placeholder by props", () => {
      render(<InputNumber textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "placeholder",
        "enter number",
      );
    });
    it("should been invisible after takes disabled by props", () => {
      render(<InputNumber textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("disabled");
    });
    it("should visible when not takes disabled by props", () => {
      render(<InputNumber textInputSpecificAttrs={{ disabled: false }} />);
      expect(screen.getByRole("spinbutton")).not.toHaveAttribute("disabled");
    });
    it("should takes readonly by props to display component only to read", () => {
      render(<InputNumber textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("readonly");
    });
    it("should takes required by props to set strict for completed", () => {
      render(<InputNumber textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("required");
    });
    it("should takes autoComplete by props to show what kind of fild it is", () => {
      render(<InputNumber textInputSpecificAttrs={{ autoComplete: "10" }} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "autoComplete",
        "10",
      );
    });
  });

  describe("Accessibility", () => {
    it("should takes aria-label by props", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-label",
        "number",
      );
    });
    it("should takes aria-labelledby by props", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-labelledby",
        "number-id",
      );
    });
    it("should takes aria-describedby props", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-describedby",
        "describe-id",
      );
    });
    it("should takes aria-invalid props", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
    it("should takes aria-required props", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-required",
        "true",
      );
    });
    it("should takes aria-disabled props", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-disabled",
        "false",
      );
    });
    it("should takes aria-readonly props", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-readonly",
        "false",
      );
    });
    it("should takes aria-valuemin", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-valuemin",
        "20",
      );
    });
    it("should takes aria-valuemax", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-valuemax",
        "40",
      );
    });
    it("should takes aria-valuenow", () => {
      render(<InputNumber a11y={ariaSettings} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-valuenow",
        "15",
      );
    });
  });
  describe("Event Handlers", () => {
    it("should call onChange when input value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <InputNumber
          eventHandlers={{
            onChange: handleChange,
          }}
        />,
      );

      const input = screen.getByRole("spinbutton");

      await user.type(input, "10");

      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it("should call onBlur when input loses focus", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(
        <InputNumber
          eventHandlers={{
            onBlur: handleBlur,
          }}
        />,
      );

      const input = screen.getByRole("spinbutton");

      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should call onFocus when input gains focus", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(
        <InputNumber
          eventHandlers={{
            onFocus: handleFocus,
          }}
        />,
      );

      const input = screen.getByRole("spinbutton");

      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
    it("should call onKeyUp when a key is released", async () => {
      const user = userEvent.setup();
      const handleKeyUp = vi.fn();

      render(
        <InputNumber
          eventHandlers={{
            onKeyUp: handleKeyUp,
          }}
        />,
      );

      const input = screen.getByRole("spinbutton");

      await user.click(input);
      await user.keyboard("A");

      expect(handleKeyUp).toHaveBeenCalledTimes(1);
    });
    it("should call onKeyDown when a key is pressed", async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(
        <InputNumber
          eventHandlers={{
            onKeyDown: handleKeyDown,
          }}
        />,
      );

      const input = screen.getByRole("spinbutton");

      await user.click(input);
      await user.keyboard("A");

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });
});
