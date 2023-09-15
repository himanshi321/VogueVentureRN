import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import EmptyState from "../../src/components/Common/EmptyState/EmptyState";

describe('Empty component',() => {
    it('has 1 child',() => {
        const tree = renderer.create(<EmptyState />).toJSON();
        expect(tree.children.length).toBe(1);
    })
})


