import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import InputText from "./InputText";
import { useRef, useState } from "react";
import userEvent from "@testing-library/user-event";

describe("InputText", () => {
  const ariaSettings = {
    ariaLabel: "text",
    ariaLabelledby: "text-id",
    ariaDescribedby: "describe-id",
    ariaInvalid: true,
    ariaRequired: true,
    ariaDisabled: false,
    ariaReadonly: false,
  };

  const globalAttributes = {
    id: "text-id",
    className: "inputClass",
    style: { color: "red", padding: "10px" },
    title: "text",
  };

  const textInputSpecificAttrs = {
    name: "text-input",
    value: "first-value",
    placeholder: "enter text",
    defaultValue: "default-value",
    disabled: true,
    readOnly: true,
    required: true,
  };

  it("has been rendered with type text", () => {
    render(<InputText />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });
  describe("Global Props:", () => {
    it("should takes id prop", () => {
      render(
        <InputText a11y={ariaSettings} globalAttributes={globalAttributes} />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "text-id");
    });
    it("should takes className prop", () => {
      render(
        <InputText a11y={ariaSettings} globalAttributes={globalAttributes} />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "class",
        "inputClass",
      );
    });
    it("should takes className prop", () => {
      render(
        <InputText a11y={ariaSettings} globalAttributes={globalAttributes} />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "class",
        "inputClass",
      );
    });
    it("should takes style prop", () => {
      render(
        <InputText a11y={ariaSettings} globalAttributes={globalAttributes} />,
      );
      expect(screen.getByRole("textbox")).toHaveStyle({
        color: "rgb(255, 0, 0)",
        padding: "10px",
      });
    });
    it("should takes title prop", () => {
      render(
        <InputText a11y={ariaSettings} globalAttributes={globalAttributes} />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("title", "text");
    });
  });
  describe("Specific attributes", () => {
    it("should accept ref from inputTextRef", () => {
      const { result } = renderHook(() => useRef<HTMLInputElement>(null));

      render(<InputText textInputSpecificAttrs={{ ref: result.current }} />);

      expect(result.current.current).toBeInstanceOf(HTMLInputElement);
      expect(result.current.current).toBeInTheDocument();
    });

    it("shuold takes name by props", () => {
      render(<InputText textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "text-input");
    });
    it("should takes value by props", () => {
      render(<InputText textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "value",
        "first-value",
      );
    });
    it("should takes placeholder by props", () => {
      render(<InputText textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "placeholder",
        "enter text",
      );
    });
    it("should been invisible after takes disabled by props", () => {
      render(<InputText textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("disabled");
    });
    it("should visible when not takes disabled by props", () => {
      render(<InputText textInputSpecificAttrs={{ disabled: false }} />);
      expect(screen.getByRole("textbox")).not.toHaveAttribute("disabled");
    });
    it("should takes readonly by props to display component only to read", () => {
      render(<InputText textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });
    it("should takes required by props to set strict for completed", () => {
      render(<InputText textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("required");
    });
    describe("Input Text - maxLength", () => {
      it("should enforce maxLength when typing", async () => {
        const user = userEvent.setup();

        render(<InputText textInputSpecificAttrs={{ maxLength: 5 }} />);

        const input = screen.getByRole("textbox");

        await user.type(input, "1234567890");
        expect(input).toHaveValue("12345");
      });
      it("should not allow pasting text longer than maxLength", async () => {
        const user = userEvent.setup();

        render(<InputText textInputSpecificAttrs={{ maxLength: 10 }} />);

        const input = screen.getByRole("textbox") as HTMLInputElement;

        input.value = "12345";

        await user.click(input);
        await user.paste("123456789044212331242342342");

        expect(input.value.length).toBeLessThanOrEqual(10);
      });
    });
    describe("Input Text - minLength", () => {
      it("should take minLength attribute", () => {
        render(<InputText textInputSpecificAttrs={{ minLength: 2 }} />);

        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input.minLength).toBe(2);
        expect(input).toHaveAttribute("minLength", "2");
      });

      it("should validate minLength on form submission", async () => {
        const user = userEvent.setup();

        const TestComponent = () => {
          const [value, setValue] = useState("");

          return (
            <InputText
              textInputSpecificAttrs={{ minLength: 5, value: value }}
              eventHandlers={{
                onChange: (e) => setValue(e.target.value),
              }}
            />
          );
        };

        render(<TestComponent />);

        const input = screen.getByRole("textbox") as HTMLInputElement;

        await user.type(input, "hi");

        expect(input.value).toBe("hi");
        expect(input.value.length).toBeLessThan(5);
      });

      it("should be valid when text length meets minLength", async () => {
        const user = userEvent.setup();

        render(<InputText textInputSpecificAttrs={{ minLength: 5 }} />);

        const input = screen.getByRole("textbox") as HTMLInputElement;

        await user.type(input, "hello");

        expect(input.validity.valid).toBe(true);
      });

      it("should invalidate when input is less than minLength", () => {
        const TestComponent = () => {
          const [value, setValue] = useState("hi");

          return (
            <InputText
              textInputSpecificAttrs={{
                minLength: 5,
                required: true,
                value: value,
              }}
              eventHandlers={{
                onChange: (e) => setValue(e.target.value),
              }}
            />
          );
        };

        render(<TestComponent />);

        const input = screen.getByRole("textbox") as HTMLInputElement;

        expect(input.value).toBe("hi");
        expect(input.value.length).toBeLessThan(5);
      });
    });
    describe("Polish name pattern validation", () => {
      it("should have pattern attribute set on input", () => {
        render(
          <InputText
            textInputSpecificAttrs={{
              pattern: "^[A-ZĄĆĘŁŃÓŚŹŻ][a-zą-ćęłńóśźż-]{1,}$",
              required: true,
            }}
          />,
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;

        expect(input).toHaveAttribute(
          "pattern",
          "^[A-ZĄĆĘŁŃÓŚŹŻ][a-zą-ćęłńóśźż-]{1,}$",
        );
        expect(input).toHaveAttribute("required");
      });
      it("should validate names using regex pattern", () => {
        const polishNameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zą-ćęłńóśźż-]{1,}$/;
        const validNames = ["Maria", "Stanisław", "Joanna", "Piotr", "Anna"];
        const invalidNames = [
          "maria",
          "MARIA",
          "M",
          "123Adam",
          "@Maria",
          "Maria-Anna",
        ];

        validNames.forEach((name) => {
          expect(polishNameRegex.test(name)).toBe(true);
        });

        invalidNames.forEach((name) => {
          expect(polishNameRegex.test(name)).toBe(false);
        });
      });
    });
    it("should takes autoComplete by props to show what kind of fild it is", () => {
      render(<InputText textInputSpecificAttrs={{ autoComplete: "email" }} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "autoComplete",
        "email",
      );
    });
    it("should takes inputMode to sign mode if you need without validation", () => {
      const modes = ["search", "email", "text", "tel", "numeric", "decimal"];

      modes.forEach((mode) => {
        const { unmount } = render(
          <InputText textInputSpecificAttrs={{ inputMode: mode as any }} />,
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input.inputMode).toBe(mode);

        unmount();
      });
    });

    it("should take list prop and link with datalist", () => {
      const handleChange = vi.fn();

      const TestComponent = () => {
        return (
          <>
            <InputText
              textInputSpecificAttrs={{ list: "exampleList" }}
              eventHandlers={{
                onChange: handleChange,
              }}
            />
            <datalist id="exampleList">
              <option value="option1" />
              <option value="option2" />
              <option value="option3" />
            </datalist>
          </>
        );
      };

      render(<TestComponent />);
      const input = screen.getByRole("combobox") as HTMLInputElement;

      expect(input.getAttribute("list")).toBe("exampleList");

      fireEvent.change(input, { target: { value: "option1" } });

      expect(handleChange).toHaveBeenCalled();
      expect(input.value).toBe("option1");

      const datalist = document.getElementById("exampleList");
      expect(datalist?.querySelectorAll("option").length).toBe(3);
    });
  });

  describe("Accessibility", () => {
    it("should takes aria-label by props", () => {
      render(<InputText a11y={ariaSettings} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-label", "text");
    });
    it("should takes aria-labelledby by props", () => {
      render(<InputText a11y={ariaSettings} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-labelledby",
        "text-id",
      );
    });
    it("should takes aria-describedby props", () => {
      render(<InputText a11y={ariaSettings} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "describe-id",
      );
    });
    it("should takes aria-invalid props", () => {
      render(<InputText a11y={ariaSettings} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
    it("should takes aria-required props", () => {
      render(<InputText a11y={ariaSettings} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-required",
        "true",
      );
    });
    it("should takes aria-disabled props", () => {
      render(<InputText a11y={ariaSettings} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-disabled",
        "false",
      );
    });
    it("should takes aria-readonly props", () => {
      render(<InputText a11y={ariaSettings} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-readonly",
        "false",
      );
    });
  });
  describe("Event Handlers", () => {
    it("should call onChange when input value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <InputText
          eventHandlers={{
            onChange: handleChange,
          }}
        />,
      );

      const input = screen.getByRole("textbox");

      await user.type(input, "Hello");

      expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it("should call onBlur when input loses focus", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(
        <InputText
          eventHandlers={{
            onBlur: handleBlur,
          }}
        />,
      );

      const input = screen.getByRole("textbox");

      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should call onFocus when input gains focus", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(
        <InputText
          eventHandlers={{
            onFocus: handleFocus,
          }}
        />,
      );

      const input = screen.getByRole("textbox");

      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
    it("should call onKeyUp when a key is released", async () => {
      const user = userEvent.setup();
      const handleKeyUp = vi.fn();

      render(
        <InputText
          eventHandlers={{
            onKeyUp: handleKeyUp,
          }}
        />,
      );

      const input = screen.getByRole("textbox");

      await user.click(input);
      await user.keyboard("A");

      expect(handleKeyUp).toHaveBeenCalledTimes(1);
    });
    it("should call onKeyDown when a key is pressed", async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(
        <InputText
          eventHandlers={{
            onKeyDown: handleKeyDown,
          }}
        />,
      );

      const input = screen.getByRole("textbox");

      await user.click(input);
      await user.keyboard("A");

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });
});
