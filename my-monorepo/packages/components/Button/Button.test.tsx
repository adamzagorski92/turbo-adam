import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  describe("has props:", () => {
    it("type set to 'button' by default", () => {
      render(<Button id="btn-id">Click me</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
    it("isVisible set to 'true' by default", () => {
      render(<Button id="btn-id">Click me</Button>);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });
    it("disabled set to 'false' by default", () => {
      render(<Button id="btn-id">Click me</Button>);
      expect(screen.getByRole("button")).not.toBeDisabled();
    });
    it("ariaAttribute not set by default", () => {
      render(<Button id="btn-id">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("aria-label");
      expect(button).not.toHaveAttribute("aria-labelledby");
      expect(button).not.toHaveAttribute("aria-describedby");
      expect(button).not.toHaveAttribute("aria-pressed");
      expect(button).not.toHaveAttribute("aria-haspopup");
      expect(button).not.toHaveAttribute("aria-controls");
      expect(button).not.toHaveAttribute("aria-disabled");
      expect(button).not.toHaveAttribute("aria-busy");
    });
  });

  it("type", () => {
    render(
      <Button id="btn-id">
        <span>Click me</span>
      </Button>,
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("does not render when isVisible is false", () => {
    render(
      <Button id="btn-id" isVisible={false}>
        <span>Click me</span>
      </Button>,
    );
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();
  });

  it("renders as disabled when the disabled prop is true", () => {
    render(
      <Button id="btn-id" disabled={true}>
        <span>Click me</span>
      </Button>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when the button is disabled", async () => {
    const handleClick = vi.fn();
    render(
      <Button id="btn-id" disabled={true} onClick={handleClick}>
        <span>Click me</span>
      </Button>,
    );

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("calls onClick when the button is clicked", async () => {
    const handleClick = vi.fn();
    render(
      <Button id="btn-id" onClick={handleClick}>
        Click me
      </Button>,
    );

    const button = screen.getByText("Click me");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("accepts a className props for flexible styling", () => {
    render(
      <Button id="btn-id" className="btn">
        Click me
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("btn");
  });

  it("accepts a type prop: submit | reset | button", () => {
    render(
      <Button id="btn-id" type="submit">
        Submit
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("accepts an id prop for better identification", () => {
    render(<Button id="btn-id">Click me</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("id", "btn-id");
  });

  it("accepts a name attribute (useful for forms)", () => {
    render(
      <Button id="btn-id" name="formBtn">
        Click me
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("name", "formBtn");
  });
  it("accepts a value attribute (useful for forms)", () => {
    render(
      <Button id="btn-id" value="formValue">
        Click me
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("value", "formValue");
  });

  describe("Accesability", () => {
    it("accepts the aria-label attribute", () => {
      render(
        <Button
          id="btn-id"
          ariaAttributes={{
            ariaLabel: "Close dialog",
          }}
        >
          X
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Close dialog",
      );
    });

    it("accepts the aria-labelledby attribute", () => {
      render(
        <Button
          id="btn-id"
          ariaAttributes={{
            ariaLabelledby: "title-id",
          }}
        >
          X
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-labelledby",
        "title-id",
      );
    });

    it("accepts aria-describedby attribute", () => {
      render(
        <Button
          id="btn-id"
          ariaAttributes={{
            ariaDescribedby: "save-help",
          }}
        >
          X
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-describedby",
        "save-help",
      );
    });

    it("accepts aria-pressed attribute", () => {
      render(
        <Button
          id="btn-id"
          ariaAttributes={{
            ariaPressed: true,
          }}
        >
          X
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });
    it("accepts aria-haspopup attribute", () => {
      render(
        <Button
          id="btn-id"
          ariaAttributes={{
            ariaHaspopup: "menu",
          }}
        >
          X
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-haspopup",
        "menu",
      );
    });
    it("accepts aria-controls attribute", () => {
      render(
        <Button
          id="btn-id"
          ariaAttributes={{
            ariaControls: "filters-panel",
          }}
        >
          X
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-controls",
        "filters-panel",
      );
    });
    it("accepts aria-busy attribute", () => {
      render(
        <Button
          id="btn-id"
          ariaAttributes={{
            ariaBusy: true,
          }}
        >
          X
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });
    it("accepts aria-hidden attribute", () => {
      render(
        <Button
          id="btn-id"
          ariaAttributes={{
            ariaHidden: true,
          }}
        >
          X
        </Button>,
      );

      expect(screen.queryByRole("button", { hidden: true })).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    describe("Aria Combobox", () => {
      it("ariaCombobox optional prop has been existed", () => {
        render(
          <Button id="btn-id" ariaCombobox={{ ariaExpanded: true }}>
            <>Click me</>
          </Button>,
        );
        expect(screen.getByRole("button")).toHaveAttribute(
          "aria-expanded",
          "true",
        );
      });
      it("aria-activedescendant optional prop has been existed", () => {
        render(
          <Button
            id="btn-id"
            ariaCombobox={{ ariaActiveDescendant: "active-option-id" }}
          >
            <>Click me</>
          </Button>,
        );
        expect(screen.getByRole("button")).toHaveAttribute(
          "aria-activedescendant",
          "active-option-id",
        );
      });
      it("aria-owns optional prop has been existed", () => {
        render(
          <Button id="btn-id" ariaCombobox={{ ariaOwns: "option-list-id" }}>
            <>Click me</>
          </Button>,
        );
        expect(screen.getByRole("button")).toHaveAttribute(
          "aria-owns",
          "option-list-id",
        );
      });
    });
  });

  describe("isIcon prop visibility", () => {
    it("default set render button without icon", () => {
      render(
        <Button id="btn-id" metaIcon={{ isIcon: false, src: "./icon.jpg" }}>
          <>Click me</>
        </Button>,
      );
      const img = screen.queryByRole("img");
      expect(img).not.toBeInTheDocument();
    });
    it("setted isIcon on true render button with icon", () => {
      render(
        <Button id="btn-id" metaIcon={{ isIcon: true, src: "./icon.jpg" }}>
          <>Click me</>
        </Button>,
      );
      const img = screen.queryByRole("img");
      expect(img).toBeInTheDocument();
    });
    it("accepts src string prop to set icon type", () => {
      render(
        <Button id="btn-id" metaIcon={{ isIcon: true, src: "./icon.jpg" }}>
          Click me
        </Button>,
      );
      const img = screen.queryByRole("img");
      expect(img).toHaveAttribute("src", "./icon.jpg");
    });
    it("accepts alt string prop to set alt text", () => {
      render(
        <Button
          id="btn-id"
          metaIcon={{ isIcon: true, src: "./icon.jpg", alt: "icon" }}
        >
          Click me
        </Button>,
      );
      const img = screen.queryByRole("img");
      expect(img).toHaveAttribute("alt", "icon");
    });
  });

  describe("Snapshot", () => {
    it("renders button snapshot with default props", () => {
      const { container } = render(<Button id="btn-id">Click me</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
