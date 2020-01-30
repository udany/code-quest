import Entity from '../base/Entity';

/**
 * @name Solution
 * @property {number} id
 *
 * @property {string} code
 * @property {number} userId
 * @property {number} completion
 * @property {number} world
 * @property {number} level
 */
export class Solution extends Entity {}

Solution.Register();
Solution.Attributes = [
    new Entity.Attributes.Integer('id'),

    new Entity.Attributes.String('code'),
    new Entity.Attributes.Integer('userId'),
    new Entity.Attributes.Float('completion'),
    new Entity.Attributes.Integer('world'),
    new Entity.Attributes.Integer('level'),
];

export default Solution;
