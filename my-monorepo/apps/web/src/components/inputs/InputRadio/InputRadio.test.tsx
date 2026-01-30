import "@testing-library/jest-dom";
import { render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputRadio from "./InputRadio";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";

const ariaSettings = {
  ariaLabel: "radio",
  ariaLabelledby: "radio-id",
  ariaDescribedby: "describe-id",
  ariaRequired: true,
  ariaDisabled: false,
};

const globalAttributes = {
  id: "radio-id",
  className: "radioClass",
  tabIndex: 1,
  title: "radio",
};

const textInputSpecificAttrs = {
  name: "radio-input",
  value: "first-value",
  disabled: true,
  required: true,
};

//  name, value, disabled, required

describe("InputRadio", () => {
  describe("General", () => {
    it("renders a radio input", () => {
      render(<InputRadio />);
      const radio = screen.getByRole("radio");
      expect(radio).toBeInTheDocument;
      expect(screen.getByRole("radio")).toHaveAttribute("type", "radio");
    });
  });
  describe("Global Props:", () => {
    it("should accept id prop", () => {
      render(<InputRadio globalAttributes={globalAttributes} />);
      expect(screen.getByRole("radio")).toHaveAttribute("id", "radio-id");
    });
    it("should accept className prop", () => {
      render(<InputRadio globalAttributes={globalAttributes} />);
      expect(screen.getByRole("radio")).toHaveAttribute("class", "radioClass");
    });
    it("should accept className prop", () => {
      render(<InputRadio globalAttributes={globalAttributes} />);
      expect(screen.getByRole("radio")).toHaveAttribute("class", "radioClass");
    });
    it("should accept title prop", () => {
      render(<InputRadio globalAttributes={globalAttributes} />);
      expect(screen.getByRole("radio")).toHaveAttribute("title", "radio");
    });
    it("should accept hidden with true value to hide input", () => {
      render(<InputRadio globalAttributes={{ hidden: true }} />);
      expect(screen.queryByRole("radio")).not.toBeInTheDocument;
    });
    describe("Keyboard navigation across multiple radio groups", () => {
      const renderRadioGroups = () => {
        render(
          <>
            <fieldset>
              <legend>Group 1</legend>
              <InputRadio
                globalAttributes={{ id: "g1-first", tabIndex: 2 }}
                textInputSpecificAttrs={{ name: "group1", value: "first" }}
              />
              <InputRadio
                globalAttributes={{ id: "g1-second", tabIndex: 1 }}
                textInputSpecificAttrs={{ name: "group1", value: "second" }}
              />
            </fieldset>

            <fieldset>
              <legend>Group 2</legend>
              <InputRadio
                globalAttributes={{ id: "g2-first", tabIndex: 2 }}
                textInputSpecificAttrs={{ name: "group2", value: "first" }}
              />
              <InputRadio
                globalAttributes={{ id: "g2-second", tabIndex: 1 }}
                textInputSpecificAttrs={{ name: "group2", value: "second" }}
              />
            </fieldset>
          </>
        );
      };

      describe("Group 1 - Navigation with Tab and Arrow keys", () => {
        it("focuses second radio (tabIndex: 1) on Tab", async () => {
          const user = userEvent.setup();
          renderRadioGroups();

          await user.tab();
          expect(document.activeElement).toHaveAttribute("id", "g1-second");
        });

        it("moves to first radio (tabIndex: 2) on ArrowRight", async () => {
          const user = userEvent.setup();
          renderRadioGroups();

          await user.tab();
          await user.keyboard("{ArrowRight}");
          expect(document.activeElement).toHaveAttribute("id", "g1-first");
        });

        it("returns to second radio on ArrowLeft", async () => {
          const user = userEvent.setup();
          renderRadioGroups();

          await user.tab();
          await user.keyboard("{ArrowRight}");
          await user.keyboard("{ArrowLeft}");
          expect(document.activeElement).toHaveAttribute("id", "g1-second");
        });
      });

      describe("Group 2 - Navigation with Tab and Arrow keys", () => {
        it("focuses second radio (tabIndex: 1) on Tab from Group 1", async () => {
          const user = userEvent.setup();
          renderRadioGroups();

          await user.tab();
          await user.tab();
          expect(document.activeElement).toHaveAttribute("id", "g2-second");
        });

        it("moves to first radio (tabIndex: 2) on ArrowRight", async () => {
          const user = userEvent.setup();
          renderRadioGroups();

          await user.tab();
          await user.tab();
          await user.keyboard("{ArrowRight}");
          expect(document.activeElement).toHaveAttribute("id", "g2-first");
        });

        it("returns to second radio on ArrowLeft", async () => {
          const user = userEvent.setup();
          renderRadioGroups();

          await user.tab();
          await user.tab();
          await user.keyboard("{ArrowRight}");
          await user.keyboard("{ArrowLeft}");
          expect(document.activeElement).toHaveAttribute("id", "g2-second");
        });
      });

      describe("Navigation between groups", () => {
        it("returns to Group 1 on Shift+Tab from Group 2", async () => {
          const user = userEvent.setup();
          renderRadioGroups();

          await user.tab();
          await user.tab();
          await user.keyboard("{Shift>}{Tab}{/Shift}");
          expect(document.activeElement).toHaveAttribute("id", "g1-second");
        });
      });
    });
  });
  describe("Specific attributes", () => {
    it("should accept ref from InputRadioRef", () => {
      const { result } = renderHook(() => useRef<HTMLInputElement>(null));

      render(<InputRadio textInputSpecificAttrs={{ ref: result.current }} />);

      expect(result.current.current).toBeInstanceOf(HTMLInputElement);
      expect(result.current.current).toBeInTheDocument();
    });

    it("shuold takes name by props", () => {
      render(<InputRadio textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("radio")).toHaveAttribute("name", "radio-input");
    });
    it("should takes value by props", () => {
      render(<InputRadio textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("radio")).toHaveAttribute("value", "first-value");
    });
    it("should been invisible after takes disabled by props", () => {
      render(<InputRadio textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("radio")).toHaveAttribute("disabled");
    });
    it("should visible when not takes disabled by props", () => {
      render(<InputRadio textInputSpecificAttrs={{ disabled: false }} />);
      expect(screen.getByRole("radio")).not.toHaveAttribute("disabled");
    });
    it("should takes required by props to set strict for completed", () => {
      render(<InputRadio textInputSpecificAttrs={textInputSpecificAttrs} />);
      expect(screen.getByRole("radio")).toHaveAttribute("required");
    });
  });
  describe("Event Handlers", () => {
    it("should call onChange when radio is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <InputRadio
          textInputSpecificAttrs={{ value: "test-value" }}
          eventHandlers={{ onChange: handleChange }}
        />
      );

      await user.click(screen.getByRole("radio"));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: "test-value",
            checked: true,
          }),
        })
      );
    });

    it("should call onBlur when input loses focus", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(
        <InputRadio
          eventHandlers={{
            onBlur: handleBlur,
          }}
        />
      );

      const input = screen.getByRole("radio");

      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should call onFocus when input gains focus", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(
        <InputRadio
          eventHandlers={{
            onFocus: handleFocus,
          }}
        />
      );

      const input = screen.getByRole("radio");

      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
    it("should call onKeyDown when ArrowRight is pressed", async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(
        <InputRadio
          eventHandlers={{
            onKeyDown: handleKeyDown,
          }}
        />
      );

      const input = screen.getByRole("radio");
      await user.click(input);
      await user.keyboard("{ArrowRight}");

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
      expect(handleKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "ArrowRight",
        })
      );
    });

    it("should call onKeyUp when ArrowRight is released", async () => {
      const user = userEvent.setup();
      const handleKeyUp = vi.fn();

      render(
        <InputRadio
          eventHandlers={{
            onKeyUp: handleKeyUp,
          }}
        />
      );

      const input = screen.getByRole("radio");
      await user.click(input);
      await user.keyboard("{ArrowRight}");

      expect(handleKeyUp).toHaveBeenCalledTimes(1);
      expect(handleKeyUp).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "ArrowRight",
        })
      );
    });
  });
  describe("Accessibility", () => {
    it("should accept ariaLabel by props and applies aria-label attribute", () => {
      render(<InputRadio a11y={ariaSettings} />);
      expect(screen.getByRole("radio")).toHaveAttribute("aria-label", "radio");
    });
    it("should accept ariaLabelledby by props and applies aria-labelledby attribute", () => {
      render(<InputRadio a11y={ariaSettings} />);
      expect(screen.getByRole("radio")).toHaveAttribute(
        "aria-labelledby",
        "radio-id"
      );
    });
    it("should accept ariaDescribedby by props and applies aria-describedby attribute", () => {
      render(<InputRadio a11y={ariaSettings} />);
      expect(screen.getByRole("radio")).toHaveAttribute(
        "aria-describedby",
        "describe-id"
      );
    });
    it("should accept ariaRequired by props and applies aria-required attribute", () => {
      render(<InputRadio a11y={ariaSettings} />);
      expect(screen.getByRole("radio")).toHaveAttribute(
        "aria-required",
        "true"
      );
    });
    it("should accept ariaDisabled by props and applies aria-disabled attribute", () => {
      render(<InputRadio a11y={ariaSettings} />);
      expect(screen.getByRole("radio")).toHaveAttribute(
        "aria-disabled",
        "false"
      );
    });
  });
});
