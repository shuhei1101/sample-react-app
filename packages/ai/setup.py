from setuptools import setup, find_packages

setup(
    name="sample-llama-index",
    version="0.1",
    packages=find_packages(exclude=["tests"]),
    test_suite="tests",
)
