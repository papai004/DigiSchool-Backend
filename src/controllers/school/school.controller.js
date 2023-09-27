import { validationResult } from "express-validator";
import SchoolService from "../../services/school.service.js";

class SchoolController {
  constructor() {}

  /**
   * Controller to create a new school
   * @param {req.body} contains the following properties
   * @param {username}
   * @param {password}
   * @param {schoolName}
   * @param {highestGrade}
   * @param {lowestGrade}
   * @param {email}
   */
  async createNewSchool(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        /**
         * If there is any error then throwing error along with details.
         */
        throw new Error("Field validation failed!", {
          cause: { indicator: "validation", status: 400, details: errors },
        });
      }

      // * Creating a new school with the given payload
      const savedSchoolDetails = await SchoolService.createNewSchool(req.body);

      res.status(201).json({
        status: "success",
        message: "School created successfully",
        data: {
          username: savedSchoolDetails?.username,
          id: savedSchoolDetails?._id,
          email: savedSchoolDetails?.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getSchool(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        /**
         * If there is any error then throwing error along with details.
         */
        throw new Error("Field validation failed!", {
          cause: { indicator: "validation", status: 400, details: errors },
        });
      }
      // * Getting the requested school with the given payload
      const getSchoolDetails = await SchoolService.getSchoolService(req.body);

      res.status(200).json({
        status: "success",
        message: "One record found",
        data: getSchoolDetails,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSchool(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        /**
         * If there is any error then throwing error along with details.
         */
        throw new Error("Field validation failed!", {
          cause: { indicator: "validation", status: 400, details: errors },
        });
      }

      const updatedFieldDetails = await SchoolService.updateSchoolService(
        req.body
      );

      res.status(201).json({
        status: "success",
        message: "School Updated successfully",
        data: {
          username: updatedFieldDetails?.username,
          id: updatedFieldDetails?._id,
          email: updatedFieldDetails?.email,
          schoolName: updatedFieldDetails?.schoolName,
          lowestGrade: updatedFieldDetails?.lowestGrade,
          highestGrade: updatedFieldDetails?.highestGrade,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSchool(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        /**
         * If there is any error then throwing error along with details.
         */
        throw new Error("Field validation failed!", {
          cause: { indicator: "validation", status: 400, details: errors },
        });
      } else {
        const deleteSchoolDetails = await SchoolService.deleteSchoolService(
          req.body
        );
        res.status(201).json({
          status: "success",
          message: "School deleted successfully",
          data: {
            username: deleteSchoolDetails?.username,
            id: deleteSchoolDetails?._id,
            email: deleteSchoolDetails?.email,
            isDeleted: deleteSchoolDetails?.isDeleted,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default SchoolController;
