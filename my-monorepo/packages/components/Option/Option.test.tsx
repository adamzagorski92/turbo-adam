import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Option from "./Option";
import userEvent from "@testing-library/user-event";

describe("Option", () => {
  it("render container for list", () => {
    const list = [
      { id: "opt-1", label: "Option 1", disabled: true },
      { id: "opt-2", label: "Option 2" },
    ];
    render(
      <Option
        list={list}
        ariaLabel="Select option"
        onItemSelect={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        selectedValue="opt-1"
        ariaDescribedby="opt-desc-id"
        listboxClassName="customClass"
        listboxId="id-001"
      />,
    );
    expect(screen.getByTestId("option-container")).toBeInTheDocument();
  });
  it("should render list items from list prop", () => {
    const list = [
      { id: "1", label: "Option 1" },
      { id: "2", label: "Option 2" },
    ];
    render(
      <Option
        list={list}
        ariaLabel="Select option"
        onItemSelect={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        selectedValue="opt-1"
        ariaDescribedby="opt-desc-id"
        listboxClassName="customClass"
        listboxId="id-001"
      />,
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
  it("should have ul with role='listbox'", () => {
    const list = [
      { id: "opt-1", label: "Option 1", disabled: true },
      { id: "opt-2", label: "Option 2" },
    ];
    render(
      <Option
        list={list}
        ariaLabel="Select option"
        onItemSelect={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        selectedValue="opt-1"
        ariaDescribedby="opt-desc-id"
        listboxClassName="customClass"
        listboxId="id-001"
      />,
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });
  it("should set id attribute on each li element", () => {
    const list = [
      { id: "opt-1", label: "Option 1" },
      { id: "opt-2", label: "Option 2" },
    ];
    render(
      <Option
        list={list}
        ariaLabel="Select option"
        onItemSelect={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        selectedValue="opt-1"
        ariaDescribedby="opt-desc-id"
        listboxClassName="customClass"
        listboxId="id-001"
      />,
    );
    expect(screen.getByRole("option", { name: "Option 1" })).toHaveAttribute(
      "id",
      "option-opt-1",
    );
  });

  it("should accept optionClassName= prop for ul", () => {
    const list = [
      { id: "opt-1", label: "Option 1", disabled: true },
      { id: "opt-2", label: "Option 2" },
    ];
    render(
      <Option
        list={list}
        listboxClassName="listbox"
        ariaLabel="Select option"
        onItemSelect={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        selectedValue="opt-1"
        ariaDescribedby="opt-desc-id"
        listboxId="id-001"
      />,
    );
    expect(screen.getByRole("listbox")).toHaveAttribute("class", "listbox");
  });
  it("should accept optionClassName prop for li", () => {
    const list = [
      { id: "opt-1", label: "Option 2", optionClassName: "option" },
    ];
    render(
      <Option
        list={list}
        ariaLabel="Select option"
        onItemSelect={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        selectedValue="opt-1"
        ariaDescribedby="opt-desc-id"
        listboxClassName="customClass"
        listboxId="id-001"
      />,
    );
    expect(screen.getByRole("option")).toHaveClass("option");
  });

  describe("Accesability", () => {
    it("should accept selectedValue prop and mark item as selected", () => {
      const list = [
        { id: "opt-1", label: "Option 1" },
        { id: "opt-2", label: "Option 2" },
      ];
      render(
        <Option
          list={list}
          selectedValue="opt-1"
          ariaLabel="Select option"
          onItemSelect={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          ariaDescribedby="opt-desc-id"
          listboxClassName="customClass"
          listboxId="id-001"
        />,
      );

      const selectedOption = screen.getByRole("option", { name: "Option 1" });
      expect(selectedOption).toHaveAttribute("aria-selected", "true");
    });
    it("should have aria-multiselectable='false'", () => {
      const list = [
        { id: "opt-1", label: "Option 1", disabled: true },
        { id: "opt-2", label: "Option 2" },
      ];
      render(
        <Option
          list={list}
          ariaLabel="Select option"
          onItemSelect={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          selectedValue="opt-1"
          ariaDescribedby="opt-desc-id"
          listboxClassName="customClass"
          listboxId="id-001"
        />,
      );
      expect(screen.getByRole("listbox")).toHaveAttribute(
        "aria-multiselectable",
        "false",
      );
    });
    it("shoud accept aria-describedby prop on ul", () => {
      const list = [
        { id: "opt-1", label: "Option 1", disabled: true },
        { id: "opt-2", label: "Option 2" },
      ];
      render(
        <Option
          list={list}
          ariaDescribedby="select-id"
          ariaLabel="Select option"
          onItemSelect={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          selectedValue="opt-1"
          listboxClassName="customClass"
          listboxId="id-001"
        />,
      );
      expect(screen.getByRole("listbox")).toHaveAttribute(
        "aria-describedby",
        "select-id",
      );
    });
    it("should disable individual items when disabled property is true", () => {
      const list = [
        { id: "opt-1", label: "Option 1", disabled: true },
        { id: "opt-2", label: "Option 2" },
      ];
      render(
        <Option
          list={list}
          ariaLabel="Select option"
          onItemSelect={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          selectedValue="opt-1"
          ariaDescribedby="opt-desc-id"
          listboxClassName="customClass"
          listboxId="id-001"
        />,
      );
      expect(screen.getByRole("option", { name: "Option 1" })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });
    it("should accept aria-label prop on ul", () => {
      const list = [
        { id: "opt-1", label: "Option 1", disabled: true },
        { id: "opt-2", label: "Option 2" },
      ];
      render(
        <Option
          list={list}
          ariaLabel="Select option"
          onItemSelect={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          selectedValue="opt-1"
          ariaDescribedby="opt-desc-id"
          listboxClassName="customClass"
          listboxId="id-001"
        />,
      );
      expect(screen.getByRole("listbox")).toHaveAttribute(
        "aria-label",
        "Select option",
      );
    });
  });

  describe("Events", () => {
    it("should not call onItemSelect when disabled item is clicked", async () => {
      const handleSelect = vi.fn();
      const list = [{ id: "opt-1", label: "Option 1", disabled: true }];
      render(
        <Option
          list={list}
          onItemSelect={handleSelect}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          selectedValue="opt-1"
          ariaLabel="option"
          ariaDescribedby="opt-desc-id"
          listboxClassName="customClass"
          listboxId="id-001"
        />,
      );

      await userEvent.click(screen.getByRole("option"));
      expect(handleSelect).not.toHaveBeenCalled();
    });
    it("should accept onMauseEnter to manage highlight option inside parrent Select", async () => {
      const onMouseEnter = vi.fn();
      const list = [
        { id: "opt-1", label: "Option 1", optionClassName: "option" },
      ];
      render(
        <Option
          list={list}
          onItemSelect={() => {}}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => {}}
          selectedValue="opt-1"
          ariaLabel="option"
          ariaDescribedby="opt-desc-id"
          listboxClassName="customClass"
          listboxId="id-001"
        />,
      );

      const firstOption = screen.getByRole("option", { name: "Option 1" });
      await userEvent.hover(firstOption);

      expect(onMouseEnter).toHaveBeenCalledWith("opt-1");
    });
    it("should call onItemSelect when is clicked", async () => {
      const handleSelect = vi.fn();
      const list = [{ id: "opt-1", label: "Option 1" }];
      render(
        <Option
          list={list}
          onItemSelect={handleSelect}
          onMouseLeave={() => {}}
          selectedValue="opt-1"
          ariaLabel="option"
          ariaDescribedby="opt-desc-id"
          listboxClassName="customClass"
          onMouseEnter={() => {}}
          listboxId="id-001"
        />,
      );

      await userEvent.click(screen.getByRole("option"));
      expect(handleSelect).toHaveBeenCalledWith("opt-1");
    });
  });
  it("should accept listboxId prop", () => {
    render(
      <Option
        list={[]}
        onItemSelect={() => {}}
        onMouseLeave={() => {}}
        selectedValue="opt-1"
        ariaLabel="option"
        ariaDescribedby="opt-desc-id"
        listboxClassName="customClass"
        onMouseEnter={() => {}}
        listboxId="id-001"
      />,
    );

    expect(screen.getByRole("listbox")).toHaveAttribute("id", "id-001");
  });
});
