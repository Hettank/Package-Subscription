import Package from "../model/package.model.js";
import User from "../model/auth.model.js";

const packageServices = {
    getPackages: async () => {
        try {
            const packages = await Package.findAll({
                include: [{ model: User }]
            })

            const currentDate = new Date()

            packages.map((pkg) => {
                if (currentDate > new Date(pkg.toDate)) {
                    pkg.isActive = false
                } else {
                    pkg.isActive = true
                }
            })

            return packages
        } catch (error) {
            throw new Error("Error getting packages", error)
        }
    },

    createPackage: async (title, description, price, fromDate, toDate) => {
        try {
            const packages = await Package.create({ title, description, price, fromDate, toDate })
            return packages
        } catch (error) {
            throw new Error("Error creating packages", error)
        }
    },

    updatePackage: async (title, description, price, fromDate, toDate, packageId) => {
        try {
            const packages = await Package.findByPk(packageId)

            const updatedPackage = await packages.update({ title, description, price, fromDate, toDate })

            return updatedPackage
        } catch (error) {
            throw new Error("Error updating package", error)
        }
    },

    deletePackage: async (packageId) => {
        try {
            const packages = await Package.findByPk(packageId)

            const users = await User.findAll({ where: { PackageId: packageId } })

            if (users.length > 0) {
                const mappedUsers = users.map(async (user) => {
                    user.PackageId = null
                    await user.save()
                })

                await Promise.all(mappedUsers)
            }

            await packages.destroy()

            return packages
        } catch (error) {
            throw new Error("Error Deleting Package")
        }
    },

    buyPackage: async (userId, packageId) => {
        try {
            const packages = await Package.findByPk(packageId)
            const user = await User.findByPk(userId)

            if (!packages) {
                throw new Error("Package not found")
            }

            if (!user) {
                throw new Error("User Not Found")
            }

            // Validation Check
            if (user.dataValues.PackageId) {
                if (user.dataValues.PackageId === packageId) {
                    throw new Error("You have bought this package")
                }

                throw new Error("You can't buy other packages since you already have one")
            }

            user.PackageId = packageId

            await user.save()

            return { user, packages }
        } catch (error) {
            throw new Error(error)
        }
    },

    fetchPackageByUser: async (userId) => {
        try {
            const packages = await Package.findOne({ include: [{ model: User, where: { id: userId } }] })

            return packages
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default packageServices