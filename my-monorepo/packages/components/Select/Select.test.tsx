import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Select from "./Select";
import userEvent from "@testing-library/user-event";

describe("Select", () => {
  it("has been rendered list item", () => {
    const list = [{ id: "opt-2", label: "Option 1" }];
    render(
      <Select
        selectId="exampleId-001"
        optionList={list}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });
  it("accepts selectId to help identify used Button context", () => {
    const list = [{ id: "opt-2", label: "Option 1" }];
    render(
      <Select
        selectId="exampleId-001"
        optionList={list}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "id",
      "selectBtn-exampleId-001",
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });
  it("should render all options from optionList", () => {
    const optionList = [
      { id: "opt-1", label: "Poland" },
      { id: "opt-2", label: "Germany" },
      { id: "opt-3", label: "France" },
    ];
    render(
      <Select
        selectId="exampleId-001"
        optionList={optionList}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByText("Poland")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
  });
  it("should handle empty optionList", () => {
    render(
      <Select
        selectId="empty"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });
  it("should render disabled options", () => {
    const optionList = [
      { id: "opt-1", label: "Poland" },
      { id: "opt-2", label: "Germany" },
      { id: "opt-3", label: "France", disabled: true },
    ];
    render(
      <Select
        selectId="disbled"
        optionList={optionList}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    const disabledOption = screen.getByRole("option", { name: "France" });
    expect(disabledOption).toHaveAttribute("aria-disabled", "true");
  });
  it("should pass selectedValue to Option when provided", async () => {
    const optionList = [
      { id: "opt-1", label: "Poland" },
      { id: "opt-2", label: "Germany" },
      { id: "opt-3", label: "France", disabled: true },
    ];
    render(
      <Select
        selectId="test"
        optionList={optionList}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
        }}
      />,
    );
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("option", { name: "Germany" }));
    await userEvent.click(screen.getByRole("button"));

    const selectedValue = screen.getByRole("option", { name: "Germany" });
    expect(selectedValue).toHaveAttribute("aria-selected", "true");
  });
  it("should update selectValue when option is clicked", async () => {
    const handleSelect = vi.fn();
    const optionList = [
      { id: "opt-1", label: "Poland" },
      { id: "opt-2", label: "Germany" },
      { id: "opt-3", label: "France", disabled: true },
    ];
    render(
      <Select
        selectId="test"
        optionList={optionList}
        onSelect={handleSelect}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: false, // ← Zamiast true
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    await userEvent.click(screen.getByRole("option", { name: "Germany" }));
    expect(handleSelect).toHaveBeenCalledWith("opt-2");
  });

  it("should not call onItemSelect when disabled option is clicked", async () => {
    const handleSelect = vi.fn();
    const optionList = [{ id: "opt-1", label: "France", disabled: true }];
    render(
      <Select
        selectId="test"
        optionList={optionList}
        onSelect={handleSelect}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );

    await userEvent.click(screen.getByRole("option"));
    expect(handleSelect).not.toHaveBeenCalled();
  });
  it("should render Select with Button icon", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./dropdown-icon.png", alt: "dropdown" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "./dropdown-icon.png",
    );
  });
  it("should accept aria-label for ul via optionAriaLabel prop", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("listbox")).toHaveAttribute("aria-label", "option");
  });
  it("should accept aria-describedby for ul via optionDescribedby prop", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("listbox")).toHaveAttribute(
      "aria-describedby",
      "opt-desc-id",
    );
  });
  it("should accept className for ul via listboxClassName prop", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("listbox")).toHaveClass("customClass");
  });

  it("should accept className to set wrapper for select via selectWrapperClassName prop", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("selectGroup")).toHaveClass("select-wrapper");
  });
  it("should render div with role=`selectGroup`", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("selectGroup")).toBeInTheDocument();
  });
  it("should pass selectId to Option component", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("listbox")).toHaveAttribute("id", "listbox-test");
  });
  it("should pass ariaHaspopup to Button component", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-haspopup",
      "listbox",
    );
  });
  it("should pass ariaControls to Button component", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
        }}
      />,
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-controls",
      "listbox-test",
    );
  });
  it("should pass ariaExpanded to Button component", () => {
    render(
      <Select
        selectId="test"
        optionList={[]}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
          ariaExpanded: true,
        }}
      />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });
  it("should update ariaActiveDescendant on option hover", async () => {
    const list = [
      { id: "opt-1", label: "Option 1", optionClassName: "option" },
      { id: "opt-2", label: "Option 2", optionClassName: "option" },
    ];
    render(
      <Select
        selectId="test"
        optionList={list}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    const firstOption = screen.getByRole("option", { name: "Option 1" });

    await userEvent.hover(firstOption);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-activedescendant",
      "opt-1",
    );
  });

  it("should close menu after selecting an option", async () => {
    const optionList = [
      { id: "opt-1", label: "Poland" },
      { id: "opt-2", label: "Germany" },
    ];
    render(
      <Select
        selectId="test"
        optionList={optionList}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(screen.getByRole("option", { name: "Germany" }));
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });
  it("should clear ariaActiveDescendant when leaving option hover", async () => {
    const list = [{ id: "opt-1", label: "Option 1" }];
    render(
      <Select
        selectId="test"
        optionList={list}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
        }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));
    const option = screen.getByRole("option");

    await userEvent.hover(option);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-activedescendant",
      "opt-1",
    );

    await userEvent.unhover(option);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-activedescendant",
      "",
    );
  });

  it("should display 'Select' as default button text when nothing is selected", () => {
    const optionList = [
      { id: "opt-1", label: "Poland" },
      { id: "opt-2", label: "Germany" },
    ];
    render(
      <Select
        selectId="test"
        optionList={optionList}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
        }}
      />,
    );

    expect(screen.getByRole("button")).toHaveTextContent("Select");
  });

  it("should display selected option label after choosing", async () => {
    const optionList = [
      { id: "opt-1", label: "Poland" },
      { id: "opt-2", label: "Germany" },
    ];
    render(
      <Select
        selectId="test"
        optionList={optionList}
        onSelect={() => {}}
        metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
        optionAriaLabel="option"
        optionDescribedby="opt-desc-id"
        listboxClassName="customClass"
        selectWrapperClassName="select-wrapper"
        accessabilityForSelectBtn={{
          ariaHaspopup: "listbox",
          ariaControls: "listbox-test",
        }}
      />,
    );

    const button = screen.getByRole("button");

    await userEvent.click(button);

    await userEvent.click(screen.getByRole("option", { name: "Poland" }));

    expect(button).toHaveTextContent("Poland");
    expect(button).not.toHaveTextContent("Select");
  });

  describe("internal state", () => {
    it("uses ariaExpanded from accessabilityForSelectBtn when provided", () => {
      render(
        <Select
          selectId="test"
          optionList={[]}
          onSelect={() => {}}
          metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
          optionAriaLabel="option"
          optionDescribedby="opt-desc-id"
          listboxClassName="customClass"
          selectWrapperClassName="select-wrapper"
          accessabilityForSelectBtn={{
            ariaHaspopup: "listbox",
            ariaControls: "listbox-test",
            ariaExpanded: true,
          }}
        />,
      );

      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("aria-expanded", "true");
    });
    it("toggles internal isOpen state and aria-expanded when ariaExpanded is not provided", async () => {
      render(
        <Select
          selectId="test"
          optionList={[]}
          onSelect={() => {}}
          metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
          optionAriaLabel="option"
          optionDescribedby="opt-desc-id"
          listboxClassName="customClass"
          selectWrapperClassName="select-wrapper"
          accessabilityForSelectBtn={{
            ariaHaspopup: "listbox",
            ariaControls: "listbox-test",
          }}
        />,
      );

      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("aria-expanded", "false");

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
    it("starts closed with default props", () => {
      render(
        <Select
          selectId="test"
          optionList={[]}
          onSelect={() => {}}
          metaIcon={{ isIcon: true, src: "./img.jpg", alt: "img" }}
          optionAriaLabel="option"
          optionDescribedby="opt-desc-id"
          listboxClassName="customClass"
          selectWrapperClassName="select-wrapper"
          accessabilityForSelectBtn={{}}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });
});
