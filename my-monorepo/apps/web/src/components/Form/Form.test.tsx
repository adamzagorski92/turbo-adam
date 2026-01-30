import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Form from "./Form";
import Button from "../Button/Button";
import userEvent from "@testing-library/user-event";

describe("Form", () => {
  it("render a form element", () => {
    render(
      <Form data-testid="test-form" id="form-id" handleSubmit={() => {}} />
    );

    expect(screen.getByTestId("test-form")).toBeInTheDocument();
  });

  it("accepts children prop", () => {
    render(
      <Form id="form-id" handleSubmit={() => {}}>
        <label>Type text</label>
      </Form>
    );
    expect(screen.getByText("Type text")).toBeInTheDocument();
  });
  it("accepts id prop to set unique id for form", () => {
    render(
      <Form data-testid="test-form" id="form-id" handleSubmit={() => {}}>
        <label>Type text</label>
      </Form>
    );
    expect(screen.getByTestId("test-form")).toHaveAttribute("id", "form-id");
  });
  it("accepts onSubmit prop to send request fn", async () => {
    const handleSubmit = vi.fn();
    render(
      <Form id="form-id" handleSubmit={handleSubmit}>
        <Button id="submit-btn" type="submit">
          Submit
        </Button>
      </Form>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(handleSubmit).toHaveBeenCalledOnce();
  });
  it("accepts onReset prop to send request fn", async () => {
    const handleReset = vi.fn();
    render(
      <Form id="form-id" handleSubmit={() => {}} handleReset={handleReset}>
        <Button id="reset-btn" type="reset">
          Reset
        </Button>
      </Form>
    );
    await userEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(handleReset).toHaveBeenCalledOnce();
  });
  it("accepts noValidate prop which disables the default HTML5 input validation", () => {
    render(
      <Form
        data-testid="test-id"
        id="form-id"
        noValidate
        handleSubmit={() => {}}
      >
        <Button id="reset-btn" type="submit">
          Reset
        </Button>
      </Form>
    );
    expect(screen.getByTestId("test-id")).toHaveAttribute("noValidate");
  });

  describe("Aria Attributes:", () => {
    it("accepts ariaLabel via string prop", () => {
      render(
        <Form
          id="form-id"
          ariaAtributes={{
            ariaLabel: "form",
          }}
          handleSubmit={() => {}}
        >
          <Button id="submit-btn" type="submit">
            Submit
          </Button>
        </Form>
      );
      expect(screen.getByRole("form")).toHaveAttribute("aria-label", "form");
    });
    it("accepts ariaLabelby via string prop", () => {
      render(
        <Form
          id="form-id"
          ariaAtributes={{
            ariaLabel: "form",
            ariaLabelledby: "form-id",
          }}
          handleSubmit={() => {}}
        >
          <Button id="submit-btn" type="submit">
            Submit
          </Button>
        </Form>
      );
      expect(screen.getByRole("form")).toHaveAttribute(
        "aria-labelledby",
        "form-id"
      );
    });
    it("accepts ariaBusy via boolean prop", () => {
      render(
        <Form
          id="form-id"
          ariaAtributes={{
            ariaLabel: "form",
            ariaBusy: true,
          }}
          handleSubmit={() => {}}
        >
          <Button id="submit-btn" type="submit">
            Submit
          </Button>
        </Form>
      );
      expect(screen.getByRole("form")).toHaveAttribute("aria-busy", "true");
    });
    it("accepts ariaInvalid via string prop", () => {
      render(
        <Form
          id="form-id"
          ariaAtributes={{
            ariaLabel: "form",
            ariaInvalid: true,
          }}
          handleSubmit={() => {}}
        >
          <Button id="submit-btn" type="submit">
            Submit
          </Button>
        </Form>
      );
      expect(screen.getByRole("form")).toHaveAttribute("aria-invalid", "true");
    });
  });
});
